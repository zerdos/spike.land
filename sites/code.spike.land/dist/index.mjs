var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __esm = (fn, res) => function __init() {
  return fn && (res = (0, fn[Object.keys(fn)[0]])(fn = 0)), res;
};
var __commonJS = (cb, mod2) => function __require() {
  return mod2 || (0, cb[Object.keys(cb)[0]])((mod2 = { exports: {} }).exports, mod2), mod2.exports;
};
var __export = (target, all) => {
  __markAsModule(target);
  for (var name3 in all)
    __defProp(target, name3, { get: all[name3], enumerable: true });
};
var __reExport = (target, module2, desc) => {
  if (module2 && typeof module2 === "object" || typeof module2 === "function") {
    for (let key of __getOwnPropNames(module2))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module2[key], enumerable: !(desc = __getOwnPropDesc(module2, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module2) => {
  return __reExport(__markAsModule(__defProp(module2 != null ? __create(__getProtoOf(module2)) : {}, "default", module2 && module2.__esModule && "default" in module2 ? { get: () => module2.default, enumerable: true } : { value: module2, enumerable: true })), module2);
};

// ../../node_modules/diff-match-patch/index.js
var require_diff_match_patch = __commonJS({
  "../../node_modules/diff-match-patch/index.js"(exports2, module2) {
    var diff_match_patch = function() {
      this.Diff_Timeout = 1;
      this.Diff_EditCost = 4;
      this.Match_Threshold = 0.5;
      this.Match_Distance = 1e3;
      this.Patch_DeleteThreshold = 0.5;
      this.Patch_Margin = 4;
      this.Match_MaxBits = 32;
    };
    var DIFF_DELETE = -1;
    var DIFF_INSERT = 1;
    var DIFF_EQUAL = 0;
    diff_match_patch.Diff = function(op, text) {
      return [op, text];
    };
    diff_match_patch.prototype.diff_main = function(text1, text2, opt_checklines, opt_deadline) {
      if (typeof opt_deadline == "undefined") {
        if (this.Diff_Timeout <= 0) {
          opt_deadline = Number.MAX_VALUE;
        } else {
          opt_deadline = new Date().getTime() + this.Diff_Timeout * 1e3;
        }
      }
      var deadline = opt_deadline;
      if (text1 == null || text2 == null) {
        throw new Error("Null input. (diff_main)");
      }
      if (text1 == text2) {
        if (text1) {
          return [new diff_match_patch.Diff(DIFF_EQUAL, text1)];
        }
        return [];
      }
      if (typeof opt_checklines == "undefined") {
        opt_checklines = true;
      }
      var checklines = opt_checklines;
      var commonlength = this.diff_commonPrefix(text1, text2);
      var commonprefix = text1.substring(0, commonlength);
      text1 = text1.substring(commonlength);
      text2 = text2.substring(commonlength);
      commonlength = this.diff_commonSuffix(text1, text2);
      var commonsuffix = text1.substring(text1.length - commonlength);
      text1 = text1.substring(0, text1.length - commonlength);
      text2 = text2.substring(0, text2.length - commonlength);
      var diffs = this.diff_compute_(text1, text2, checklines, deadline);
      if (commonprefix) {
        diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, commonprefix));
      }
      if (commonsuffix) {
        diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, commonsuffix));
      }
      this.diff_cleanupMerge(diffs);
      return diffs;
    };
    diff_match_patch.prototype.diff_compute_ = function(text1, text2, checklines, deadline) {
      var diffs;
      if (!text1) {
        return [new diff_match_patch.Diff(DIFF_INSERT, text2)];
      }
      if (!text2) {
        return [new diff_match_patch.Diff(DIFF_DELETE, text1)];
      }
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      var i = longtext.indexOf(shorttext);
      if (i != -1) {
        diffs = [
          new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(0, i)),
          new diff_match_patch.Diff(DIFF_EQUAL, shorttext),
          new diff_match_patch.Diff(DIFF_INSERT, longtext.substring(i + shorttext.length))
        ];
        if (text1.length > text2.length) {
          diffs[0][0] = diffs[2][0] = DIFF_DELETE;
        }
        return diffs;
      }
      if (shorttext.length == 1) {
        return [
          new diff_match_patch.Diff(DIFF_DELETE, text1),
          new diff_match_patch.Diff(DIFF_INSERT, text2)
        ];
      }
      var hm = this.diff_halfMatch_(text1, text2);
      if (hm) {
        var text1_a = hm[0];
        var text1_b = hm[1];
        var text2_a = hm[2];
        var text2_b = hm[3];
        var mid_common = hm[4];
        var diffs_a = this.diff_main(text1_a, text2_a, checklines, deadline);
        var diffs_b = this.diff_main(text1_b, text2_b, checklines, deadline);
        return diffs_a.concat([new diff_match_patch.Diff(DIFF_EQUAL, mid_common)], diffs_b);
      }
      if (checklines && text1.length > 100 && text2.length > 100) {
        return this.diff_lineMode_(text1, text2, deadline);
      }
      return this.diff_bisect_(text1, text2, deadline);
    };
    diff_match_patch.prototype.diff_lineMode_ = function(text1, text2, deadline) {
      var a = this.diff_linesToChars_(text1, text2);
      text1 = a.chars1;
      text2 = a.chars2;
      var linearray = a.lineArray;
      var diffs = this.diff_main(text1, text2, false, deadline);
      this.diff_charsToLines_(diffs, linearray);
      this.diff_cleanupSemantic(diffs);
      diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ""));
      var pointer = 0;
      var count_delete = 0;
      var count_insert = 0;
      var text_delete = "";
      var text_insert = "";
      while (pointer < diffs.length) {
        switch (diffs[pointer][0]) {
          case DIFF_INSERT:
            count_insert++;
            text_insert += diffs[pointer][1];
            break;
          case DIFF_DELETE:
            count_delete++;
            text_delete += diffs[pointer][1];
            break;
          case DIFF_EQUAL:
            if (count_delete >= 1 && count_insert >= 1) {
              diffs.splice(pointer - count_delete - count_insert, count_delete + count_insert);
              pointer = pointer - count_delete - count_insert;
              var subDiff = this.diff_main(text_delete, text_insert, false, deadline);
              for (var j = subDiff.length - 1; j >= 0; j--) {
                diffs.splice(pointer, 0, subDiff[j]);
              }
              pointer = pointer + subDiff.length;
            }
            count_insert = 0;
            count_delete = 0;
            text_delete = "";
            text_insert = "";
            break;
        }
        pointer++;
      }
      diffs.pop();
      return diffs;
    };
    diff_match_patch.prototype.diff_bisect_ = function(text1, text2, deadline) {
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
      var front = delta % 2 != 0;
      var k1start = 0;
      var k1end = 0;
      var k2start = 0;
      var k2end = 0;
      for (var d = 0; d < max_d; d++) {
        if (new Date().getTime() > deadline) {
          break;
        }
        for (var k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
          var k1_offset = v_offset + k1;
          var x1;
          if (k1 == -d || k1 != d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
            x1 = v1[k1_offset + 1];
          } else {
            x1 = v1[k1_offset - 1] + 1;
          }
          var y1 = x1 - k1;
          while (x1 < text1_length && y1 < text2_length && text1.charAt(x1) == text2.charAt(y1)) {
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
            if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] != -1) {
              var x2 = text1_length - v2[k2_offset];
              if (x1 >= x2) {
                return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
              }
            }
          }
        }
        for (var k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
          var k2_offset = v_offset + k2;
          var x2;
          if (k2 == -d || k2 != d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
            x2 = v2[k2_offset + 1];
          } else {
            x2 = v2[k2_offset - 1] + 1;
          }
          var y2 = x2 - k2;
          while (x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) == text2.charAt(text2_length - y2 - 1)) {
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
            if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] != -1) {
              var x1 = v1[k1_offset];
              var y1 = v_offset + x1 - k1_offset;
              x2 = text1_length - x2;
              if (x1 >= x2) {
                return this.diff_bisectSplit_(text1, text2, x1, y1, deadline);
              }
            }
          }
        }
      }
      return [
        new diff_match_patch.Diff(DIFF_DELETE, text1),
        new diff_match_patch.Diff(DIFF_INSERT, text2)
      ];
    };
    diff_match_patch.prototype.diff_bisectSplit_ = function(text1, text2, x, y, deadline) {
      var text1a = text1.substring(0, x);
      var text2a = text2.substring(0, y);
      var text1b = text1.substring(x);
      var text2b = text2.substring(y);
      var diffs = this.diff_main(text1a, text2a, false, deadline);
      var diffsb = this.diff_main(text1b, text2b, false, deadline);
      return diffs.concat(diffsb);
    };
    diff_match_patch.prototype.diff_linesToChars_ = function(text1, text2) {
      var lineArray = [];
      var lineHash = {};
      lineArray[0] = "";
      function diff_linesToCharsMunge_(text) {
        var chars = "";
        var lineStart = 0;
        var lineEnd = -1;
        var lineArrayLength = lineArray.length;
        while (lineEnd < text.length - 1) {
          lineEnd = text.indexOf("\n", lineStart);
          if (lineEnd == -1) {
            lineEnd = text.length - 1;
          }
          var line = text.substring(lineStart, lineEnd + 1);
          if (lineHash.hasOwnProperty ? lineHash.hasOwnProperty(line) : lineHash[line] !== void 0) {
            chars += String.fromCharCode(lineHash[line]);
          } else {
            if (lineArrayLength == maxLines) {
              line = text.substring(lineStart);
              lineEnd = text.length;
            }
            chars += String.fromCharCode(lineArrayLength);
            lineHash[line] = lineArrayLength;
            lineArray[lineArrayLength++] = line;
          }
          lineStart = lineEnd + 1;
        }
        return chars;
      }
      var maxLines = 4e4;
      var chars1 = diff_linesToCharsMunge_(text1);
      maxLines = 65535;
      var chars2 = diff_linesToCharsMunge_(text2);
      return { chars1, chars2, lineArray };
    };
    diff_match_patch.prototype.diff_charsToLines_ = function(diffs, lineArray) {
      for (var i = 0; i < diffs.length; i++) {
        var chars = diffs[i][1];
        var text = [];
        for (var j = 0; j < chars.length; j++) {
          text[j] = lineArray[chars.charCodeAt(j)];
        }
        diffs[i][1] = text.join("");
      }
    };
    diff_match_patch.prototype.diff_commonPrefix = function(text1, text2) {
      if (!text1 || !text2 || text1.charAt(0) != text2.charAt(0)) {
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
      return pointermid;
    };
    diff_match_patch.prototype.diff_commonSuffix = function(text1, text2) {
      if (!text1 || !text2 || text1.charAt(text1.length - 1) != text2.charAt(text2.length - 1)) {
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
      return pointermid;
    };
    diff_match_patch.prototype.diff_commonOverlap_ = function(text1, text2) {
      var text1_length = text1.length;
      var text2_length = text2.length;
      if (text1_length == 0 || text2_length == 0) {
        return 0;
      }
      if (text1_length > text2_length) {
        text1 = text1.substring(text1_length - text2_length);
      } else if (text1_length < text2_length) {
        text2 = text2.substring(0, text1_length);
      }
      var text_length = Math.min(text1_length, text2_length);
      if (text1 == text2) {
        return text_length;
      }
      var best = 0;
      var length2 = 1;
      while (true) {
        var pattern = text1.substring(text_length - length2);
        var found = text2.indexOf(pattern);
        if (found == -1) {
          return best;
        }
        length2 += found;
        if (found == 0 || text1.substring(text_length - length2) == text2.substring(0, length2)) {
          best = length2;
          length2++;
        }
      }
    };
    diff_match_patch.prototype.diff_halfMatch_ = function(text1, text2) {
      if (this.Diff_Timeout <= 0) {
        return null;
      }
      var longtext = text1.length > text2.length ? text1 : text2;
      var shorttext = text1.length > text2.length ? text2 : text1;
      if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
        return null;
      }
      var dmp = this;
      function diff_halfMatchI_(longtext2, shorttext2, i) {
        var seed = longtext2.substring(i, i + Math.floor(longtext2.length / 4));
        var j = -1;
        var best_common = "";
        var best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
        while ((j = shorttext2.indexOf(seed, j + 1)) != -1) {
          var prefixLength = dmp.diff_commonPrefix(longtext2.substring(i), shorttext2.substring(j));
          var suffixLength = dmp.diff_commonSuffix(longtext2.substring(0, i), shorttext2.substring(0, j));
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
    };
    diff_match_patch.prototype.diff_cleanupSemantic = function(diffs) {
      var changes = false;
      var equalities = [];
      var equalitiesLength = 0;
      var lastEquality = null;
      var pointer = 0;
      var length_insertions1 = 0;
      var length_deletions1 = 0;
      var length_insertions2 = 0;
      var length_deletions2 = 0;
      while (pointer < diffs.length) {
        if (diffs[pointer][0] == DIFF_EQUAL) {
          equalities[equalitiesLength++] = pointer;
          length_insertions1 = length_insertions2;
          length_deletions1 = length_deletions2;
          length_insertions2 = 0;
          length_deletions2 = 0;
          lastEquality = diffs[pointer][1];
        } else {
          if (diffs[pointer][0] == DIFF_INSERT) {
            length_insertions2 += diffs[pointer][1].length;
          } else {
            length_deletions2 += diffs[pointer][1].length;
          }
          if (lastEquality && lastEquality.length <= Math.max(length_insertions1, length_deletions1) && lastEquality.length <= Math.max(length_insertions2, length_deletions2)) {
            diffs.splice(equalities[equalitiesLength - 1], 0, new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
            diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
            equalitiesLength--;
            equalitiesLength--;
            pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
            length_insertions1 = 0;
            length_deletions1 = 0;
            length_insertions2 = 0;
            length_deletions2 = 0;
            lastEquality = null;
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        this.diff_cleanupMerge(diffs);
      }
      this.diff_cleanupSemanticLossless(diffs);
      pointer = 1;
      while (pointer < diffs.length) {
        if (diffs[pointer - 1][0] == DIFF_DELETE && diffs[pointer][0] == DIFF_INSERT) {
          var deletion = diffs[pointer - 1][1];
          var insertion = diffs[pointer][1];
          var overlap_length1 = this.diff_commonOverlap_(deletion, insertion);
          var overlap_length2 = this.diff_commonOverlap_(insertion, deletion);
          if (overlap_length1 >= overlap_length2) {
            if (overlap_length1 >= deletion.length / 2 || overlap_length1 >= insertion.length / 2) {
              diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL, insertion.substring(0, overlap_length1)));
              diffs[pointer - 1][1] = deletion.substring(0, deletion.length - overlap_length1);
              diffs[pointer + 1][1] = insertion.substring(overlap_length1);
              pointer++;
            }
          } else {
            if (overlap_length2 >= deletion.length / 2 || overlap_length2 >= insertion.length / 2) {
              diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_EQUAL, deletion.substring(0, overlap_length2)));
              diffs[pointer - 1][0] = DIFF_INSERT;
              diffs[pointer - 1][1] = insertion.substring(0, insertion.length - overlap_length2);
              diffs[pointer + 1][0] = DIFF_DELETE;
              diffs[pointer + 1][1] = deletion.substring(overlap_length2);
              pointer++;
            }
          }
          pointer++;
        }
        pointer++;
      }
    };
    diff_match_patch.prototype.diff_cleanupSemanticLossless = function(diffs) {
      function diff_cleanupSemanticScore_(one, two) {
        if (!one || !two) {
          return 6;
        }
        var char1 = one.charAt(one.length - 1);
        var char2 = two.charAt(0);
        var nonAlphaNumeric1 = char1.match(diff_match_patch.nonAlphaNumericRegex_);
        var nonAlphaNumeric2 = char2.match(diff_match_patch.nonAlphaNumericRegex_);
        var whitespace1 = nonAlphaNumeric1 && char1.match(diff_match_patch.whitespaceRegex_);
        var whitespace2 = nonAlphaNumeric2 && char2.match(diff_match_patch.whitespaceRegex_);
        var lineBreak1 = whitespace1 && char1.match(diff_match_patch.linebreakRegex_);
        var lineBreak2 = whitespace2 && char2.match(diff_match_patch.linebreakRegex_);
        var blankLine1 = lineBreak1 && one.match(diff_match_patch.blanklineEndRegex_);
        var blankLine2 = lineBreak2 && two.match(diff_match_patch.blanklineStartRegex_);
        if (blankLine1 || blankLine2) {
          return 5;
        } else if (lineBreak1 || lineBreak2) {
          return 4;
        } else if (nonAlphaNumeric1 && !whitespace1 && whitespace2) {
          return 3;
        } else if (whitespace1 || whitespace2) {
          return 2;
        } else if (nonAlphaNumeric1 || nonAlphaNumeric2) {
          return 1;
        }
        return 0;
      }
      var pointer = 1;
      while (pointer < diffs.length - 1) {
        if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
          var equality1 = diffs[pointer - 1][1];
          var edit = diffs[pointer][1];
          var equality2 = diffs[pointer + 1][1];
          var commonOffset = this.diff_commonSuffix(equality1, edit);
          if (commonOffset) {
            var commonString = edit.substring(edit.length - commonOffset);
            equality1 = equality1.substring(0, equality1.length - commonOffset);
            edit = commonString + edit.substring(0, edit.length - commonOffset);
            equality2 = commonString + equality2;
          }
          var bestEquality1 = equality1;
          var bestEdit = edit;
          var bestEquality2 = equality2;
          var bestScore = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
          while (edit.charAt(0) === equality2.charAt(0)) {
            equality1 += edit.charAt(0);
            edit = edit.substring(1) + equality2.charAt(0);
            equality2 = equality2.substring(1);
            var score = diff_cleanupSemanticScore_(equality1, edit) + diff_cleanupSemanticScore_(edit, equality2);
            if (score >= bestScore) {
              bestScore = score;
              bestEquality1 = equality1;
              bestEdit = edit;
              bestEquality2 = equality2;
            }
          }
          if (diffs[pointer - 1][1] != bestEquality1) {
            if (bestEquality1) {
              diffs[pointer - 1][1] = bestEquality1;
            } else {
              diffs.splice(pointer - 1, 1);
              pointer--;
            }
            diffs[pointer][1] = bestEdit;
            if (bestEquality2) {
              diffs[pointer + 1][1] = bestEquality2;
            } else {
              diffs.splice(pointer + 1, 1);
              pointer--;
            }
          }
        }
        pointer++;
      }
    };
    diff_match_patch.nonAlphaNumericRegex_ = /[^a-zA-Z0-9]/;
    diff_match_patch.whitespaceRegex_ = /\s/;
    diff_match_patch.linebreakRegex_ = /[\r\n]/;
    diff_match_patch.blanklineEndRegex_ = /\n\r?\n$/;
    diff_match_patch.blanklineStartRegex_ = /^\r?\n\r?\n/;
    diff_match_patch.prototype.diff_cleanupEfficiency = function(diffs) {
      var changes = false;
      var equalities = [];
      var equalitiesLength = 0;
      var lastEquality = null;
      var pointer = 0;
      var pre_ins = false;
      var pre_del = false;
      var post_ins = false;
      var post_del = false;
      while (pointer < diffs.length) {
        if (diffs[pointer][0] == DIFF_EQUAL) {
          if (diffs[pointer][1].length < this.Diff_EditCost && (post_ins || post_del)) {
            equalities[equalitiesLength++] = pointer;
            pre_ins = post_ins;
            pre_del = post_del;
            lastEquality = diffs[pointer][1];
          } else {
            equalitiesLength = 0;
            lastEquality = null;
          }
          post_ins = post_del = false;
        } else {
          if (diffs[pointer][0] == DIFF_DELETE) {
            post_del = true;
          } else {
            post_ins = true;
          }
          if (lastEquality && (pre_ins && pre_del && post_ins && post_del || lastEquality.length < this.Diff_EditCost / 2 && pre_ins + pre_del + post_ins + post_del == 3)) {
            diffs.splice(equalities[equalitiesLength - 1], 0, new diff_match_patch.Diff(DIFF_DELETE, lastEquality));
            diffs[equalities[equalitiesLength - 1] + 1][0] = DIFF_INSERT;
            equalitiesLength--;
            lastEquality = null;
            if (pre_ins && pre_del) {
              post_ins = post_del = true;
              equalitiesLength = 0;
            } else {
              equalitiesLength--;
              pointer = equalitiesLength > 0 ? equalities[equalitiesLength - 1] : -1;
              post_ins = post_del = false;
            }
            changes = true;
          }
        }
        pointer++;
      }
      if (changes) {
        this.diff_cleanupMerge(diffs);
      }
    };
    diff_match_patch.prototype.diff_cleanupMerge = function(diffs) {
      diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, ""));
      var pointer = 0;
      var count_delete = 0;
      var count_insert = 0;
      var text_delete = "";
      var text_insert = "";
      var commonlength;
      while (pointer < diffs.length) {
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
            if (count_delete + count_insert > 1) {
              if (count_delete !== 0 && count_insert !== 0) {
                commonlength = this.diff_commonPrefix(text_insert, text_delete);
                if (commonlength !== 0) {
                  if (pointer - count_delete - count_insert > 0 && diffs[pointer - count_delete - count_insert - 1][0] == DIFF_EQUAL) {
                    diffs[pointer - count_delete - count_insert - 1][1] += text_insert.substring(0, commonlength);
                  } else {
                    diffs.splice(0, 0, new diff_match_patch.Diff(DIFF_EQUAL, text_insert.substring(0, commonlength)));
                    pointer++;
                  }
                  text_insert = text_insert.substring(commonlength);
                  text_delete = text_delete.substring(commonlength);
                }
                commonlength = this.diff_commonSuffix(text_insert, text_delete);
                if (commonlength !== 0) {
                  diffs[pointer][1] = text_insert.substring(text_insert.length - commonlength) + diffs[pointer][1];
                  text_insert = text_insert.substring(0, text_insert.length - commonlength);
                  text_delete = text_delete.substring(0, text_delete.length - commonlength);
                }
              }
              pointer -= count_delete + count_insert;
              diffs.splice(pointer, count_delete + count_insert);
              if (text_delete.length) {
                diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_DELETE, text_delete));
                pointer++;
              }
              if (text_insert.length) {
                diffs.splice(pointer, 0, new diff_match_patch.Diff(DIFF_INSERT, text_insert));
                pointer++;
              }
              pointer++;
            } else if (pointer !== 0 && diffs[pointer - 1][0] == DIFF_EQUAL) {
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
        if (diffs[pointer - 1][0] == DIFF_EQUAL && diffs[pointer + 1][0] == DIFF_EQUAL) {
          if (diffs[pointer][1].substring(diffs[pointer][1].length - diffs[pointer - 1][1].length) == diffs[pointer - 1][1]) {
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
        this.diff_cleanupMerge(diffs);
      }
    };
    diff_match_patch.prototype.diff_xIndex = function(diffs, loc) {
      var chars1 = 0;
      var chars2 = 0;
      var last_chars1 = 0;
      var last_chars2 = 0;
      var x;
      for (x = 0; x < diffs.length; x++) {
        if (diffs[x][0] !== DIFF_INSERT) {
          chars1 += diffs[x][1].length;
        }
        if (diffs[x][0] !== DIFF_DELETE) {
          chars2 += diffs[x][1].length;
        }
        if (chars1 > loc) {
          break;
        }
        last_chars1 = chars1;
        last_chars2 = chars2;
      }
      if (diffs.length != x && diffs[x][0] === DIFF_DELETE) {
        return last_chars2;
      }
      return last_chars2 + (loc - last_chars1);
    };
    diff_match_patch.prototype.diff_prettyHtml = function(diffs) {
      var html = [];
      var pattern_amp = /&/g;
      var pattern_lt = /</g;
      var pattern_gt = />/g;
      var pattern_para = /\n/g;
      for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];
        var data = diffs[x][1];
        var text = data.replace(pattern_amp, "&amp;").replace(pattern_lt, "&lt;").replace(pattern_gt, "&gt;").replace(pattern_para, "&para;<br>");
        switch (op) {
          case DIFF_INSERT:
            html[x] = '<ins style="background:#e6ffe6;">' + text + "</ins>";
            break;
          case DIFF_DELETE:
            html[x] = '<del style="background:#ffe6e6;">' + text + "</del>";
            break;
          case DIFF_EQUAL:
            html[x] = "<span>" + text + "</span>";
            break;
        }
      }
      return html.join("");
    };
    diff_match_patch.prototype.diff_text1 = function(diffs) {
      var text = [];
      for (var x = 0; x < diffs.length; x++) {
        if (diffs[x][0] !== DIFF_INSERT) {
          text[x] = diffs[x][1];
        }
      }
      return text.join("");
    };
    diff_match_patch.prototype.diff_text2 = function(diffs) {
      var text = [];
      for (var x = 0; x < diffs.length; x++) {
        if (diffs[x][0] !== DIFF_DELETE) {
          text[x] = diffs[x][1];
        }
      }
      return text.join("");
    };
    diff_match_patch.prototype.diff_levenshtein = function(diffs) {
      var levenshtein = 0;
      var insertions = 0;
      var deletions = 0;
      for (var x = 0; x < diffs.length; x++) {
        var op = diffs[x][0];
        var data = diffs[x][1];
        switch (op) {
          case DIFF_INSERT:
            insertions += data.length;
            break;
          case DIFF_DELETE:
            deletions += data.length;
            break;
          case DIFF_EQUAL:
            levenshtein += Math.max(insertions, deletions);
            insertions = 0;
            deletions = 0;
            break;
        }
      }
      levenshtein += Math.max(insertions, deletions);
      return levenshtein;
    };
    diff_match_patch.prototype.diff_toDelta = function(diffs) {
      var text = [];
      for (var x = 0; x < diffs.length; x++) {
        switch (diffs[x][0]) {
          case DIFF_INSERT:
            text[x] = "+" + encodeURI(diffs[x][1]);
            break;
          case DIFF_DELETE:
            text[x] = "-" + diffs[x][1].length;
            break;
          case DIFF_EQUAL:
            text[x] = "=" + diffs[x][1].length;
            break;
        }
      }
      return text.join("	").replace(/%20/g, " ");
    };
    diff_match_patch.prototype.diff_fromDelta = function(text1, delta) {
      var diffs = [];
      var diffsLength = 0;
      var pointer = 0;
      var tokens = delta.split(/\t/g);
      for (var x = 0; x < tokens.length; x++) {
        var param = tokens[x].substring(1);
        switch (tokens[x].charAt(0)) {
          case "+":
            try {
              diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_INSERT, decodeURI(param));
            } catch (ex) {
              throw new Error("Illegal escape in diff_fromDelta: " + param);
            }
            break;
          case "-":
          case "=":
            var n = parseInt(param, 10);
            if (isNaN(n) || n < 0) {
              throw new Error("Invalid number in diff_fromDelta: " + param);
            }
            var text = text1.substring(pointer, pointer += n);
            if (tokens[x].charAt(0) == "=") {
              diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_EQUAL, text);
            } else {
              diffs[diffsLength++] = new diff_match_patch.Diff(DIFF_DELETE, text);
            }
            break;
          default:
            if (tokens[x]) {
              throw new Error("Invalid diff operation in diff_fromDelta: " + tokens[x]);
            }
        }
      }
      if (pointer != text1.length) {
        throw new Error("Delta length (" + pointer + ") does not equal source text length (" + text1.length + ").");
      }
      return diffs;
    };
    diff_match_patch.prototype.match_main = function(text, pattern, loc) {
      if (text == null || pattern == null || loc == null) {
        throw new Error("Null input. (match_main)");
      }
      loc = Math.max(0, Math.min(loc, text.length));
      if (text == pattern) {
        return 0;
      } else if (!text.length) {
        return -1;
      } else if (text.substring(loc, loc + pattern.length) == pattern) {
        return loc;
      } else {
        return this.match_bitap_(text, pattern, loc);
      }
    };
    diff_match_patch.prototype.match_bitap_ = function(text, pattern, loc) {
      if (pattern.length > this.Match_MaxBits) {
        throw new Error("Pattern too long for this browser.");
      }
      var s = this.match_alphabet_(pattern);
      var dmp = this;
      function match_bitapScore_(e, x) {
        var accuracy = e / pattern.length;
        var proximity = Math.abs(loc - x);
        if (!dmp.Match_Distance) {
          return proximity ? 1 : accuracy;
        }
        return accuracy + proximity / dmp.Match_Distance;
      }
      var score_threshold = this.Match_Threshold;
      var best_loc = text.indexOf(pattern, loc);
      if (best_loc != -1) {
        score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
        best_loc = text.lastIndexOf(pattern, loc + pattern.length);
        if (best_loc != -1) {
          score_threshold = Math.min(match_bitapScore_(0, best_loc), score_threshold);
        }
      }
      var matchmask = 1 << pattern.length - 1;
      best_loc = -1;
      var bin_min, bin_mid;
      var bin_max = pattern.length + text.length;
      var last_rd;
      for (var d = 0; d < pattern.length; d++) {
        bin_min = 0;
        bin_mid = bin_max;
        while (bin_min < bin_mid) {
          if (match_bitapScore_(d, loc + bin_mid) <= score_threshold) {
            bin_min = bin_mid;
          } else {
            bin_max = bin_mid;
          }
          bin_mid = Math.floor((bin_max - bin_min) / 2 + bin_min);
        }
        bin_max = bin_mid;
        var start = Math.max(1, loc - bin_mid + 1);
        var finish = Math.min(loc + bin_mid, text.length) + pattern.length;
        var rd = Array(finish + 2);
        rd[finish + 1] = (1 << d) - 1;
        for (var j = finish; j >= start; j--) {
          var charMatch = s[text.charAt(j - 1)];
          if (d === 0) {
            rd[j] = (rd[j + 1] << 1 | 1) & charMatch;
          } else {
            rd[j] = (rd[j + 1] << 1 | 1) & charMatch | ((last_rd[j + 1] | last_rd[j]) << 1 | 1) | last_rd[j + 1];
          }
          if (rd[j] & matchmask) {
            var score = match_bitapScore_(d, j - 1);
            if (score <= score_threshold) {
              score_threshold = score;
              best_loc = j - 1;
              if (best_loc > loc) {
                start = Math.max(1, 2 * loc - best_loc);
              } else {
                break;
              }
            }
          }
        }
        if (match_bitapScore_(d + 1, loc) > score_threshold) {
          break;
        }
        last_rd = rd;
      }
      return best_loc;
    };
    diff_match_patch.prototype.match_alphabet_ = function(pattern) {
      var s = {};
      for (var i = 0; i < pattern.length; i++) {
        s[pattern.charAt(i)] = 0;
      }
      for (var i = 0; i < pattern.length; i++) {
        s[pattern.charAt(i)] |= 1 << pattern.length - i - 1;
      }
      return s;
    };
    diff_match_patch.prototype.patch_addContext_ = function(patch, text) {
      if (text.length == 0) {
        return;
      }
      if (patch.start2 === null) {
        throw Error("patch not initialized");
      }
      var pattern = text.substring(patch.start2, patch.start2 + patch.length1);
      var padding = 0;
      while (text.indexOf(pattern) != text.lastIndexOf(pattern) && pattern.length < this.Match_MaxBits - this.Patch_Margin - this.Patch_Margin) {
        padding += this.Patch_Margin;
        pattern = text.substring(patch.start2 - padding, patch.start2 + patch.length1 + padding);
      }
      padding += this.Patch_Margin;
      var prefix = text.substring(patch.start2 - padding, patch.start2);
      if (prefix) {
        patch.diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, prefix));
      }
      var suffix = text.substring(patch.start2 + patch.length1, patch.start2 + patch.length1 + padding);
      if (suffix) {
        patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, suffix));
      }
      patch.start1 -= prefix.length;
      patch.start2 -= prefix.length;
      patch.length1 += prefix.length + suffix.length;
      patch.length2 += prefix.length + suffix.length;
    };
    diff_match_patch.prototype.patch_make = function(a, opt_b, opt_c) {
      var text1, diffs;
      if (typeof a == "string" && typeof opt_b == "string" && typeof opt_c == "undefined") {
        text1 = a;
        diffs = this.diff_main(text1, opt_b, true);
        if (diffs.length > 2) {
          this.diff_cleanupSemantic(diffs);
          this.diff_cleanupEfficiency(diffs);
        }
      } else if (a && typeof a == "object" && typeof opt_b == "undefined" && typeof opt_c == "undefined") {
        diffs = a;
        text1 = this.diff_text1(diffs);
      } else if (typeof a == "string" && opt_b && typeof opt_b == "object" && typeof opt_c == "undefined") {
        text1 = a;
        diffs = opt_b;
      } else if (typeof a == "string" && typeof opt_b == "string" && opt_c && typeof opt_c == "object") {
        text1 = a;
        diffs = opt_c;
      } else {
        throw new Error("Unknown call format to patch_make.");
      }
      if (diffs.length === 0) {
        return [];
      }
      var patches = [];
      var patch = new diff_match_patch.patch_obj();
      var patchDiffLength = 0;
      var char_count1 = 0;
      var char_count2 = 0;
      var prepatch_text = text1;
      var postpatch_text = text1;
      for (var x = 0; x < diffs.length; x++) {
        var diff_type = diffs[x][0];
        var diff_text = diffs[x][1];
        if (!patchDiffLength && diff_type !== DIFF_EQUAL) {
          patch.start1 = char_count1;
          patch.start2 = char_count2;
        }
        switch (diff_type) {
          case DIFF_INSERT:
            patch.diffs[patchDiffLength++] = diffs[x];
            patch.length2 += diff_text.length;
            postpatch_text = postpatch_text.substring(0, char_count2) + diff_text + postpatch_text.substring(char_count2);
            break;
          case DIFF_DELETE:
            patch.length1 += diff_text.length;
            patch.diffs[patchDiffLength++] = diffs[x];
            postpatch_text = postpatch_text.substring(0, char_count2) + postpatch_text.substring(char_count2 + diff_text.length);
            break;
          case DIFF_EQUAL:
            if (diff_text.length <= 2 * this.Patch_Margin && patchDiffLength && diffs.length != x + 1) {
              patch.diffs[patchDiffLength++] = diffs[x];
              patch.length1 += diff_text.length;
              patch.length2 += diff_text.length;
            } else if (diff_text.length >= 2 * this.Patch_Margin) {
              if (patchDiffLength) {
                this.patch_addContext_(patch, prepatch_text);
                patches.push(patch);
                patch = new diff_match_patch.patch_obj();
                patchDiffLength = 0;
                prepatch_text = postpatch_text;
                char_count1 = char_count2;
              }
            }
            break;
        }
        if (diff_type !== DIFF_INSERT) {
          char_count1 += diff_text.length;
        }
        if (diff_type !== DIFF_DELETE) {
          char_count2 += diff_text.length;
        }
      }
      if (patchDiffLength) {
        this.patch_addContext_(patch, prepatch_text);
        patches.push(patch);
      }
      return patches;
    };
    diff_match_patch.prototype.patch_deepCopy = function(patches) {
      var patchesCopy = [];
      for (var x = 0; x < patches.length; x++) {
        var patch = patches[x];
        var patchCopy = new diff_match_patch.patch_obj();
        patchCopy.diffs = [];
        for (var y = 0; y < patch.diffs.length; y++) {
          patchCopy.diffs[y] = new diff_match_patch.Diff(patch.diffs[y][0], patch.diffs[y][1]);
        }
        patchCopy.start1 = patch.start1;
        patchCopy.start2 = patch.start2;
        patchCopy.length1 = patch.length1;
        patchCopy.length2 = patch.length2;
        patchesCopy[x] = patchCopy;
      }
      return patchesCopy;
    };
    diff_match_patch.prototype.patch_apply = function(patches, text) {
      if (patches.length == 0) {
        return [text, []];
      }
      patches = this.patch_deepCopy(patches);
      var nullPadding = this.patch_addPadding(patches);
      text = nullPadding + text + nullPadding;
      this.patch_splitMax(patches);
      var delta = 0;
      var results = [];
      for (var x = 0; x < patches.length; x++) {
        var expected_loc = patches[x].start2 + delta;
        var text1 = this.diff_text1(patches[x].diffs);
        var start_loc;
        var end_loc = -1;
        if (text1.length > this.Match_MaxBits) {
          start_loc = this.match_main(text, text1.substring(0, this.Match_MaxBits), expected_loc);
          if (start_loc != -1) {
            end_loc = this.match_main(text, text1.substring(text1.length - this.Match_MaxBits), expected_loc + text1.length - this.Match_MaxBits);
            if (end_loc == -1 || start_loc >= end_loc) {
              start_loc = -1;
            }
          }
        } else {
          start_loc = this.match_main(text, text1, expected_loc);
        }
        if (start_loc == -1) {
          results[x] = false;
          delta -= patches[x].length2 - patches[x].length1;
        } else {
          results[x] = true;
          delta = start_loc - expected_loc;
          var text2;
          if (end_loc == -1) {
            text2 = text.substring(start_loc, start_loc + text1.length);
          } else {
            text2 = text.substring(start_loc, end_loc + this.Match_MaxBits);
          }
          if (text1 == text2) {
            text = text.substring(0, start_loc) + this.diff_text2(patches[x].diffs) + text.substring(start_loc + text1.length);
          } else {
            var diffs = this.diff_main(text1, text2, false);
            if (text1.length > this.Match_MaxBits && this.diff_levenshtein(diffs) / text1.length > this.Patch_DeleteThreshold) {
              results[x] = false;
            } else {
              this.diff_cleanupSemanticLossless(diffs);
              var index1 = 0;
              var index2;
              for (var y = 0; y < patches[x].diffs.length; y++) {
                var mod2 = patches[x].diffs[y];
                if (mod2[0] !== DIFF_EQUAL) {
                  index2 = this.diff_xIndex(diffs, index1);
                }
                if (mod2[0] === DIFF_INSERT) {
                  text = text.substring(0, start_loc + index2) + mod2[1] + text.substring(start_loc + index2);
                } else if (mod2[0] === DIFF_DELETE) {
                  text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(diffs, index1 + mod2[1].length));
                }
                if (mod2[0] !== DIFF_DELETE) {
                  index1 += mod2[1].length;
                }
              }
            }
          }
        }
      }
      text = text.substring(nullPadding.length, text.length - nullPadding.length);
      return [text, results];
    };
    diff_match_patch.prototype.patch_addPadding = function(patches) {
      var paddingLength = this.Patch_Margin;
      var nullPadding = "";
      for (var x = 1; x <= paddingLength; x++) {
        nullPadding += String.fromCharCode(x);
      }
      for (var x = 0; x < patches.length; x++) {
        patches[x].start1 += paddingLength;
        patches[x].start2 += paddingLength;
      }
      var patch = patches[0];
      var diffs = patch.diffs;
      if (diffs.length == 0 || diffs[0][0] != DIFF_EQUAL) {
        diffs.unshift(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
        patch.start1 -= paddingLength;
        patch.start2 -= paddingLength;
        patch.length1 += paddingLength;
        patch.length2 += paddingLength;
      } else if (paddingLength > diffs[0][1].length) {
        var extraLength = paddingLength - diffs[0][1].length;
        diffs[0][1] = nullPadding.substring(diffs[0][1].length) + diffs[0][1];
        patch.start1 -= extraLength;
        patch.start2 -= extraLength;
        patch.length1 += extraLength;
        patch.length2 += extraLength;
      }
      patch = patches[patches.length - 1];
      diffs = patch.diffs;
      if (diffs.length == 0 || diffs[diffs.length - 1][0] != DIFF_EQUAL) {
        diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, nullPadding));
        patch.length1 += paddingLength;
        patch.length2 += paddingLength;
      } else if (paddingLength > diffs[diffs.length - 1][1].length) {
        var extraLength = paddingLength - diffs[diffs.length - 1][1].length;
        diffs[diffs.length - 1][1] += nullPadding.substring(0, extraLength);
        patch.length1 += extraLength;
        patch.length2 += extraLength;
      }
      return nullPadding;
    };
    diff_match_patch.prototype.patch_splitMax = function(patches) {
      var patch_size = this.Match_MaxBits;
      for (var x = 0; x < patches.length; x++) {
        if (patches[x].length1 <= patch_size) {
          continue;
        }
        var bigpatch = patches[x];
        patches.splice(x--, 1);
        var start1 = bigpatch.start1;
        var start2 = bigpatch.start2;
        var precontext = "";
        while (bigpatch.diffs.length !== 0) {
          var patch = new diff_match_patch.patch_obj();
          var empty2 = true;
          patch.start1 = start1 - precontext.length;
          patch.start2 = start2 - precontext.length;
          if (precontext !== "") {
            patch.length1 = patch.length2 = precontext.length;
            patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, precontext));
          }
          while (bigpatch.diffs.length !== 0 && patch.length1 < patch_size - this.Patch_Margin) {
            var diff_type = bigpatch.diffs[0][0];
            var diff_text = bigpatch.diffs[0][1];
            if (diff_type === DIFF_INSERT) {
              patch.length2 += diff_text.length;
              start2 += diff_text.length;
              patch.diffs.push(bigpatch.diffs.shift());
              empty2 = false;
            } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
              patch.length1 += diff_text.length;
              start1 += diff_text.length;
              empty2 = false;
              patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
              bigpatch.diffs.shift();
            } else {
              diff_text = diff_text.substring(0, patch_size - patch.length1 - this.Patch_Margin);
              patch.length1 += diff_text.length;
              start1 += diff_text.length;
              if (diff_type === DIFF_EQUAL) {
                patch.length2 += diff_text.length;
                start2 += diff_text.length;
              } else {
                empty2 = false;
              }
              patch.diffs.push(new diff_match_patch.Diff(diff_type, diff_text));
              if (diff_text == bigpatch.diffs[0][1]) {
                bigpatch.diffs.shift();
              } else {
                bigpatch.diffs[0][1] = bigpatch.diffs[0][1].substring(diff_text.length);
              }
            }
          }
          precontext = this.diff_text2(patch.diffs);
          precontext = precontext.substring(precontext.length - this.Patch_Margin);
          var postcontext = this.diff_text1(bigpatch.diffs).substring(0, this.Patch_Margin);
          if (postcontext !== "") {
            patch.length1 += postcontext.length;
            patch.length2 += postcontext.length;
            if (patch.diffs.length !== 0 && patch.diffs[patch.diffs.length - 1][0] === DIFF_EQUAL) {
              patch.diffs[patch.diffs.length - 1][1] += postcontext;
            } else {
              patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, postcontext));
            }
          }
          if (!empty2) {
            patches.splice(++x, 0, patch);
          }
        }
      }
    };
    diff_match_patch.prototype.patch_toText = function(patches) {
      var text = [];
      for (var x = 0; x < patches.length; x++) {
        text[x] = patches[x];
      }
      return text.join("");
    };
    diff_match_patch.prototype.patch_fromText = function(textline) {
      var patches = [];
      if (!textline) {
        return patches;
      }
      var text = textline.split("\n");
      var textPointer = 0;
      var patchHeader = /^@@ -(\d+),?(\d*) \+(\d+),?(\d*) @@$/;
      while (textPointer < text.length) {
        var m = text[textPointer].match(patchHeader);
        if (!m) {
          throw new Error("Invalid patch string: " + text[textPointer]);
        }
        var patch = new diff_match_patch.patch_obj();
        patches.push(patch);
        patch.start1 = parseInt(m[1], 10);
        if (m[2] === "") {
          patch.start1--;
          patch.length1 = 1;
        } else if (m[2] == "0") {
          patch.length1 = 0;
        } else {
          patch.start1--;
          patch.length1 = parseInt(m[2], 10);
        }
        patch.start2 = parseInt(m[3], 10);
        if (m[4] === "") {
          patch.start2--;
          patch.length2 = 1;
        } else if (m[4] == "0") {
          patch.length2 = 0;
        } else {
          patch.start2--;
          patch.length2 = parseInt(m[4], 10);
        }
        textPointer++;
        while (textPointer < text.length) {
          var sign = text[textPointer].charAt(0);
          try {
            var line = decodeURI(text[textPointer].substring(1));
          } catch (ex) {
            throw new Error("Illegal escape in patch_fromText: " + line);
          }
          if (sign == "-") {
            patch.diffs.push(new diff_match_patch.Diff(DIFF_DELETE, line));
          } else if (sign == "+") {
            patch.diffs.push(new diff_match_patch.Diff(DIFF_INSERT, line));
          } else if (sign == " ") {
            patch.diffs.push(new diff_match_patch.Diff(DIFF_EQUAL, line));
          } else if (sign == "@") {
            break;
          } else if (sign === "") {
          } else {
            throw new Error('Invalid patch mode "' + sign + '" in: ' + line);
          }
          textPointer++;
        }
      }
      return patches;
    };
    diff_match_patch.patch_obj = function() {
      this.diffs = [];
      this.start1 = null;
      this.start2 = null;
      this.length1 = 0;
      this.length2 = 0;
    };
    diff_match_patch.patch_obj.prototype.toString = function() {
      var coords1, coords2;
      if (this.length1 === 0) {
        coords1 = this.start1 + ",0";
      } else if (this.length1 == 1) {
        coords1 = this.start1 + 1;
      } else {
        coords1 = this.start1 + 1 + "," + this.length1;
      }
      if (this.length2 === 0) {
        coords2 = this.start2 + ",0";
      } else if (this.length2 == 1) {
        coords2 = this.start2 + 1;
      } else {
        coords2 = this.start2 + 1 + "," + this.length2;
      }
      var text = ["@@ -" + coords1 + " +" + coords2 + " @@\n"];
      var op;
      for (var x = 0; x < this.diffs.length; x++) {
        switch (this.diffs[x][0]) {
          case DIFF_INSERT:
            op = "+";
            break;
          case DIFF_DELETE:
            op = "-";
            break;
          case DIFF_EQUAL:
            op = " ";
            break;
        }
        text[x + 1] = op + encodeURI(this.diffs[x][1]) + "\n";
      }
      return text.join("").replace(/%20/g, " ");
    };
    module2.exports = diff_match_patch;
    module2.exports["diff_match_patch"] = diff_match_patch;
    module2.exports["DIFF_DELETE"] = DIFF_DELETE;
    module2.exports["DIFF_INSERT"] = DIFF_INSERT;
    module2.exports["DIFF_EQUAL"] = DIFF_EQUAL;
  }
});

// ../../node_modules/it-batch/index.js
var require_it_batch = __commonJS({
  "../../node_modules/it-batch/index.js"(exports2, module2) {
    "use strict";
    async function* batch(source, size = 1) {
      let things = [];
      if (size < 1) {
        size = 1;
      }
      for await (const thing of source) {
        things.push(thing);
        while (things.length >= size) {
          yield things.slice(0, size);
          things = things.slice(size);
        }
      }
      while (things.length) {
        yield things.slice(0, size);
        things = things.slice(size);
      }
    }
    module2.exports = batch;
  }
});

// ../../node_modules/it-parallel-batch/index.js
var require_it_parallel_batch = __commonJS({
  "../../node_modules/it-parallel-batch/index.js"(exports2, module2) {
    "use strict";
    var batch = require_it_batch();
    async function* parallelBatch(source, size = 1) {
      for await (const tasks of batch(source, size)) {
        const things = tasks.map((p) => {
          return p().then((value) => ({ ok: true, value }), (err) => ({ ok: false, err }));
        });
        for (let i = 0; i < things.length; i++) {
          const result = await things[i];
          if (result.ok) {
            yield result.value;
          } else {
            throw result.err;
          }
        }
      }
    }
    module2.exports = parallelBatch;
  }
});

// ../../node_modules/is-plain-obj/index.js
var require_is_plain_obj = __commonJS({
  "../../node_modules/is-plain-obj/index.js"(exports2, module2) {
    "use strict";
    module2.exports = (value) => {
      if (Object.prototype.toString.call(value) !== "[object Object]") {
        return false;
      }
      const prototype = Object.getPrototypeOf(value);
      return prototype === null || prototype === Object.prototype;
    };
  }
});

// ../../node_modules/merge-options/index.js
var require_merge_options = __commonJS({
  "../../node_modules/merge-options/index.js"(exports2, module2) {
    "use strict";
    var isOptionObject = require_is_plain_obj();
    var { hasOwnProperty } = Object.prototype;
    var { propertyIsEnumerable } = Object;
    var defineProperty = (object, name3, value) => Object.defineProperty(object, name3, {
      value,
      writable: true,
      enumerable: true,
      configurable: true
    });
    var globalThis = exports2;
    var defaultMergeOptions = {
      concatArrays: false,
      ignoreUndefined: false
    };
    var getEnumerableOwnPropertyKeys = (value) => {
      const keys = [];
      for (const key in value) {
        if (hasOwnProperty.call(value, key)) {
          keys.push(key);
        }
      }
      if (Object.getOwnPropertySymbols) {
        const symbols = Object.getOwnPropertySymbols(value);
        for (const symbol of symbols) {
          if (propertyIsEnumerable.call(value, symbol)) {
            keys.push(symbol);
          }
        }
      }
      return keys;
    };
    function clone(value) {
      if (Array.isArray(value)) {
        return cloneArray(value);
      }
      if (isOptionObject(value)) {
        return cloneOptionObject(value);
      }
      return value;
    }
    function cloneArray(array) {
      const result = array.slice(0, 0);
      getEnumerableOwnPropertyKeys(array).forEach((key) => {
        defineProperty(result, key, clone(array[key]));
      });
      return result;
    }
    function cloneOptionObject(object) {
      const result = Object.getPrototypeOf(object) === null ? Object.create(null) : {};
      getEnumerableOwnPropertyKeys(object).forEach((key) => {
        defineProperty(result, key, clone(object[key]));
      });
      return result;
    }
    var mergeKeys = (merged, source, keys, config) => {
      keys.forEach((key) => {
        if (typeof source[key] === "undefined" && config.ignoreUndefined) {
          return;
        }
        if (key in merged && merged[key] !== Object.getPrototypeOf(merged)) {
          defineProperty(merged, key, merge(merged[key], source[key], config));
        } else {
          defineProperty(merged, key, clone(source[key]));
        }
      });
      return merged;
    };
    var concatArrays = (merged, source, config) => {
      let result = merged.slice(0, 0);
      let resultIndex = 0;
      [merged, source].forEach((array) => {
        const indices = [];
        for (let k = 0; k < array.length; k++) {
          if (!hasOwnProperty.call(array, k)) {
            continue;
          }
          indices.push(String(k));
          if (array === merged) {
            defineProperty(result, resultIndex++, array[k]);
          } else {
            defineProperty(result, resultIndex++, clone(array[k]));
          }
        }
        result = mergeKeys(result, array, getEnumerableOwnPropertyKeys(array).filter((key) => !indices.includes(key)), config);
      });
      return result;
    };
    function merge(merged, source, config) {
      if (config.concatArrays && Array.isArray(merged) && Array.isArray(source)) {
        return concatArrays(merged, source, config);
      }
      if (!isOptionObject(source) || !isOptionObject(merged)) {
        return clone(source);
      }
      return mergeKeys(merged, source, getEnumerableOwnPropertyKeys(source), config);
    }
    module2.exports = function(...options) {
      const config = merge(clone(defaultMergeOptions), this !== globalThis && this || {}, defaultMergeOptions);
      let merged = { _: {} };
      for (const option of options) {
        if (option === void 0) {
          continue;
        }
        if (!isOptionObject(option)) {
          throw new TypeError("`" + option + "` is not an Option Object");
        }
        merged = merge(merged, { _: option }, config);
      }
      return merged._;
    };
  }
});

// ../../node_modules/err-code/index.js
var require_err_code = __commonJS({
  "../../node_modules/err-code/index.js"(exports2, module2) {
    "use strict";
    function assign(obj, props) {
      for (const key in props) {
        Object.defineProperty(obj, key, {
          value: props[key],
          enumerable: true,
          configurable: true
        });
      }
      return obj;
    }
    function createError(err, code3, props) {
      if (!err || typeof err === "string") {
        throw new TypeError("Please pass an Error to err-code");
      }
      if (!props) {
        props = {};
      }
      if (typeof code3 === "object") {
        props = code3;
        code3 = "";
      }
      if (code3) {
        props.code = code3;
      }
      try {
        return assign(err, props);
      } catch (_) {
        props.message = err.message;
        props.stack = err.stack;
        const ErrClass = function() {
        };
        ErrClass.prototype = Object.create(Object.getPrototypeOf(err));
        const output = assign(new ErrClass(), props);
        return output;
      }
    }
    module2.exports = createError;
  }
});

// ../../node_modules/@multiformats/base-x/src/index.js
var require_src = __commonJS({
  "../../node_modules/@multiformats/base-x/src/index.js"(exports2, module2) {
    "use strict";
    function base3(ALPHABET) {
      if (ALPHABET.length >= 255) {
        throw new TypeError("Alphabet too long");
      }
      var BASE_MAP = new Uint8Array(256);
      for (var j = 0; j < BASE_MAP.length; j++) {
        BASE_MAP[j] = 255;
      }
      for (var i = 0; i < ALPHABET.length; i++) {
        var x = ALPHABET.charAt(i);
        var xc = x.charCodeAt(0);
        if (BASE_MAP[xc] !== 255) {
          throw new TypeError(x + " is ambiguous");
        }
        BASE_MAP[xc] = i;
      }
      var BASE = ALPHABET.length;
      var LEADER = ALPHABET.charAt(0);
      var FACTOR = Math.log(BASE) / Math.log(256);
      var iFACTOR = Math.log(256) / Math.log(BASE);
      function encode5(source) {
        if (source instanceof Uint8Array) {
        } else if (ArrayBuffer.isView(source)) {
          source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
        } else if (Array.isArray(source)) {
          source = Uint8Array.from(source);
        }
        if (!(source instanceof Uint8Array)) {
          throw new TypeError("Expected Uint8Array");
        }
        if (source.length === 0) {
          return "";
        }
        var zeroes = 0;
        var length2 = 0;
        var pbegin = 0;
        var pend = source.length;
        while (pbegin !== pend && source[pbegin] === 0) {
          pbegin++;
          zeroes++;
        }
        var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
        var b58 = new Uint8Array(size);
        while (pbegin !== pend) {
          var carry = source[pbegin];
          var i2 = 0;
          for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
            carry += 256 * b58[it1] >>> 0;
            b58[it1] = carry % BASE >>> 0;
            carry = carry / BASE >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length2 = i2;
          pbegin++;
        }
        var it2 = size - length2;
        while (it2 !== size && b58[it2] === 0) {
          it2++;
        }
        var str = LEADER.repeat(zeroes);
        for (; it2 < size; ++it2) {
          str += ALPHABET.charAt(b58[it2]);
        }
        return str;
      }
      function decodeUnsafe(source) {
        if (typeof source !== "string") {
          throw new TypeError("Expected String");
        }
        if (source.length === 0) {
          return new Uint8Array();
        }
        var psz = 0;
        if (source[psz] === " ") {
          return;
        }
        var zeroes = 0;
        var length2 = 0;
        while (source[psz] === LEADER) {
          zeroes++;
          psz++;
        }
        var size = (source.length - psz) * FACTOR + 1 >>> 0;
        var b256 = new Uint8Array(size);
        while (source[psz]) {
          var carry = BASE_MAP[source.charCodeAt(psz)];
          if (carry === 255) {
            return;
          }
          var i2 = 0;
          for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
            carry += BASE * b256[it3] >>> 0;
            b256[it3] = carry % 256 >>> 0;
            carry = carry / 256 >>> 0;
          }
          if (carry !== 0) {
            throw new Error("Non-zero carry");
          }
          length2 = i2;
          psz++;
        }
        if (source[psz] === " ") {
          return;
        }
        var it4 = size - length2;
        while (it4 !== size && b256[it4] === 0) {
          it4++;
        }
        var vch = new Uint8Array(zeroes + (size - it4));
        var j2 = zeroes;
        while (it4 !== size) {
          vch[j2++] = b256[it4++];
        }
        return vch;
      }
      function decode7(string2) {
        var buffer = decodeUnsafe(string2);
        if (buffer) {
          return buffer;
        }
        throw new Error("Non-base" + BASE + " character");
      }
      return {
        encode: encode5,
        decodeUnsafe,
        decode: decode7
      };
    }
    module2.exports = base3;
  }
});

// ../../node_modules/multibase/src/util.js
var require_util = __commonJS({
  "../../node_modules/multibase/src/util.js"(exports2, module2) {
    "use strict";
    var textDecoder2 = new TextDecoder();
    var decodeText = (bytes) => textDecoder2.decode(bytes);
    var textEncoder2 = new TextEncoder();
    var encodeText = (text) => textEncoder2.encode(text);
    function concat2(arrs, length2) {
      const output = new Uint8Array(length2);
      let offset = 0;
      for (const arr of arrs) {
        output.set(arr, offset);
        offset += arr.length;
      }
      return output;
    }
    module2.exports = { decodeText, encodeText, concat: concat2 };
  }
});

// ../../node_modules/multibase/src/base.js
var require_base = __commonJS({
  "../../node_modules/multibase/src/base.js"(exports2, module2) {
    "use strict";
    var { encodeText } = require_util();
    var Base = class {
      constructor(name3, code3, factory, alphabet) {
        this.name = name3;
        this.code = code3;
        this.codeBuf = encodeText(this.code);
        this.alphabet = alphabet;
        this.codec = factory(alphabet);
      }
      encode(buf) {
        return this.codec.encode(buf);
      }
      decode(string2) {
        for (const char of string2) {
          if (this.alphabet && this.alphabet.indexOf(char) < 0) {
            throw new Error(`invalid character '${char}' in '${string2}'`);
          }
        }
        return this.codec.decode(string2);
      }
    };
    module2.exports = Base;
  }
});

// ../../node_modules/multibase/src/rfc4648.js
var require_rfc4648 = __commonJS({
  "../../node_modules/multibase/src/rfc4648.js"(exports2, module2) {
    "use strict";
    var decode7 = (string2, alphabet, bitsPerChar) => {
      const codes = {};
      for (let i = 0; i < alphabet.length; ++i) {
        codes[alphabet[i]] = i;
      }
      let end = string2.length;
      while (string2[end - 1] === "=") {
        --end;
      }
      const out = new Uint8Array(end * bitsPerChar / 8 | 0);
      let bits = 0;
      let buffer = 0;
      let written = 0;
      for (let i = 0; i < end; ++i) {
        const value = codes[string2[i]];
        if (value === void 0) {
          throw new SyntaxError("Invalid character " + string2[i]);
        }
        buffer = buffer << bitsPerChar | value;
        bits += bitsPerChar;
        if (bits >= 8) {
          bits -= 8;
          out[written++] = 255 & buffer >> bits;
        }
      }
      if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
        throw new SyntaxError("Unexpected end of data");
      }
      return out;
    };
    var encode5 = (data, alphabet, bitsPerChar) => {
      const pad = alphabet[alphabet.length - 1] === "=";
      const mask = (1 << bitsPerChar) - 1;
      let out = "";
      let bits = 0;
      let buffer = 0;
      for (let i = 0; i < data.length; ++i) {
        buffer = buffer << 8 | data[i];
        bits += 8;
        while (bits > bitsPerChar) {
          bits -= bitsPerChar;
          out += alphabet[mask & buffer >> bits];
        }
      }
      if (bits) {
        out += alphabet[mask & buffer << bitsPerChar - bits];
      }
      if (pad) {
        while (out.length * bitsPerChar & 7) {
          out += "=";
        }
      }
      return out;
    };
    var rfc46482 = (bitsPerChar) => (alphabet) => {
      return {
        encode(input) {
          return encode5(input, alphabet, bitsPerChar);
        },
        decode(input) {
          return decode7(input, alphabet, bitsPerChar);
        }
      };
    };
    module2.exports = { rfc4648: rfc46482 };
  }
});

// ../../node_modules/multibase/src/constants.js
var require_constants = __commonJS({
  "../../node_modules/multibase/src/constants.js"(exports2, module2) {
    "use strict";
    var baseX2 = require_src();
    var Base = require_base();
    var { rfc4648: rfc46482 } = require_rfc4648();
    var { decodeText, encodeText } = require_util();
    var identity3 = () => {
      return {
        encode: decodeText,
        decode: encodeText
      };
    };
    var constants = [
      ["identity", "\0", identity3, ""],
      ["base2", "0", rfc46482(1), "01"],
      ["base8", "7", rfc46482(3), "01234567"],
      ["base10", "9", baseX2, "0123456789"],
      ["base16", "f", rfc46482(4), "0123456789abcdef"],
      ["base16upper", "F", rfc46482(4), "0123456789ABCDEF"],
      ["base32hex", "v", rfc46482(5), "0123456789abcdefghijklmnopqrstuv"],
      ["base32hexupper", "V", rfc46482(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV"],
      ["base32hexpad", "t", rfc46482(5), "0123456789abcdefghijklmnopqrstuv="],
      ["base32hexpadupper", "T", rfc46482(5), "0123456789ABCDEFGHIJKLMNOPQRSTUV="],
      ["base32", "b", rfc46482(5), "abcdefghijklmnopqrstuvwxyz234567"],
      ["base32upper", "B", rfc46482(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567"],
      ["base32pad", "c", rfc46482(5), "abcdefghijklmnopqrstuvwxyz234567="],
      ["base32padupper", "C", rfc46482(5), "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567="],
      ["base32z", "h", rfc46482(5), "ybndrfg8ejkmcpqxot1uwisza345h769"],
      ["base36", "k", baseX2, "0123456789abcdefghijklmnopqrstuvwxyz"],
      ["base36upper", "K", baseX2, "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"],
      ["base58btc", "z", baseX2, "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"],
      ["base58flickr", "Z", baseX2, "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"],
      ["base64", "m", rfc46482(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/"],
      ["base64pad", "M", rfc46482(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/="],
      ["base64url", "u", rfc46482(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_"],
      ["base64urlpad", "U", rfc46482(6), "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_="]
    ];
    var names = constants.reduce((prev, tupple) => {
      prev[tupple[0]] = new Base(tupple[0], tupple[1], tupple[2], tupple[3]);
      return prev;
    }, {});
    var codes = constants.reduce((prev, tupple) => {
      prev[tupple[1]] = names[tupple[0]];
      return prev;
    }, {});
    module2.exports = {
      names,
      codes
    };
  }
});

// ../../node_modules/multibase/src/index.js
var require_src2 = __commonJS({
  "../../node_modules/multibase/src/index.js"(exports2, module2) {
    "use strict";
    var constants = require_constants();
    var { encodeText, decodeText, concat: concat2 } = require_util();
    function multibase(nameOrCode, buf) {
      if (!buf) {
        throw new Error("requires an encoded Uint8Array");
      }
      const { name: name3, codeBuf } = encoding(nameOrCode);
      validEncode(name3, buf);
      return concat2([codeBuf, buf], codeBuf.length + buf.length);
    }
    function encode5(nameOrCode, buf) {
      const enc = encoding(nameOrCode);
      const data = encodeText(enc.encode(buf));
      return concat2([enc.codeBuf, data], enc.codeBuf.length + data.length);
    }
    function decode7(data) {
      if (data instanceof Uint8Array) {
        data = decodeText(data);
      }
      const prefix = data[0];
      if (["f", "F", "v", "V", "t", "T", "b", "B", "c", "C", "h", "k", "K"].includes(prefix)) {
        data = data.toLowerCase();
      }
      const enc = encoding(data[0]);
      return enc.decode(data.substring(1));
    }
    function isEncoded(data) {
      if (data instanceof Uint8Array) {
        data = decodeText(data);
      }
      if (Object.prototype.toString.call(data) !== "[object String]") {
        return false;
      }
      try {
        const enc = encoding(data[0]);
        return enc.name;
      } catch (err) {
        return false;
      }
    }
    function validEncode(name3, buf) {
      const enc = encoding(name3);
      enc.decode(decodeText(buf));
    }
    function encoding(nameOrCode) {
      if (Object.prototype.hasOwnProperty.call(constants.names, nameOrCode)) {
        return constants.names[nameOrCode];
      } else if (Object.prototype.hasOwnProperty.call(constants.codes, nameOrCode)) {
        return constants.codes[nameOrCode];
      } else {
        throw new Error(`Unsupported encoding: ${nameOrCode}`);
      }
    }
    function encodingFromData(data) {
      if (data instanceof Uint8Array) {
        data = decodeText(data);
      }
      return encoding(data[0]);
    }
    exports2 = module2.exports = multibase;
    exports2.encode = encode5;
    exports2.decode = decode7;
    exports2.isEncoded = isEncoded;
    exports2.encoding = encoding;
    exports2.encodingFromData = encodingFromData;
    var names = Object.freeze(constants.names);
    var codes = Object.freeze(constants.codes);
    exports2.names = names;
    exports2.codes = codes;
  }
});

// ../../node_modules/multihashes/node_modules/varint/encode.js
var require_encode = __commonJS({
  "../../node_modules/multihashes/node_modules/varint/encode.js"(exports2, module2) {
    module2.exports = encode5;
    var MSB2 = 128;
    var REST2 = 127;
    var MSBALL2 = ~REST2;
    var INT2 = Math.pow(2, 31);
    function encode5(num, out, offset) {
      out = out || [];
      offset = offset || 0;
      var oldOffset = offset;
      while (num >= INT2) {
        out[offset++] = num & 255 | MSB2;
        num /= 128;
      }
      while (num & MSBALL2) {
        out[offset++] = num & 255 | MSB2;
        num >>>= 7;
      }
      out[offset] = num | 0;
      encode5.bytes = offset - oldOffset + 1;
      return out;
    }
  }
});

// ../../node_modules/multihashes/node_modules/varint/decode.js
var require_decode = __commonJS({
  "../../node_modules/multihashes/node_modules/varint/decode.js"(exports2, module2) {
    module2.exports = read2;
    var MSB2 = 128;
    var REST2 = 127;
    function read2(buf, offset) {
      var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
      do {
        if (counter >= l) {
          read2.bytes = 0;
          throw new RangeError("Could not decode varint");
        }
        b = buf[counter++];
        res += shift < 28 ? (b & REST2) << shift : (b & REST2) * Math.pow(2, shift);
        shift += 7;
      } while (b >= MSB2);
      read2.bytes = counter - offset;
      return res;
    }
  }
});

// ../../node_modules/multihashes/node_modules/varint/length.js
var require_length = __commonJS({
  "../../node_modules/multihashes/node_modules/varint/length.js"(exports2, module2) {
    var N12 = Math.pow(2, 7);
    var N22 = Math.pow(2, 14);
    var N32 = Math.pow(2, 21);
    var N42 = Math.pow(2, 28);
    var N52 = Math.pow(2, 35);
    var N62 = Math.pow(2, 42);
    var N72 = Math.pow(2, 49);
    var N82 = Math.pow(2, 56);
    var N92 = Math.pow(2, 63);
    module2.exports = function(value) {
      return value < N12 ? 1 : value < N22 ? 2 : value < N32 ? 3 : value < N42 ? 4 : value < N52 ? 5 : value < N62 ? 6 : value < N72 ? 7 : value < N82 ? 8 : value < N92 ? 9 : 10;
    };
  }
});

// ../../node_modules/multihashes/node_modules/varint/index.js
var require_varint = __commonJS({
  "../../node_modules/multihashes/node_modules/varint/index.js"(exports2, module2) {
    module2.exports = {
      encode: require_encode(),
      decode: require_decode(),
      encodingLength: require_length()
    };
  }
});

// ../../node_modules/multihashes/src/constants.js
var require_constants2 = __commonJS({
  "../../node_modules/multihashes/src/constants.js"(exports2, module2) {
    "use strict";
    var names = Object.freeze({
      "identity": 0,
      "sha1": 17,
      "sha2-256": 18,
      "sha2-512": 19,
      "sha3-512": 20,
      "sha3-384": 21,
      "sha3-256": 22,
      "sha3-224": 23,
      "shake-128": 24,
      "shake-256": 25,
      "keccak-224": 26,
      "keccak-256": 27,
      "keccak-384": 28,
      "keccak-512": 29,
      "blake3": 30,
      "murmur3-128": 34,
      "murmur3-32": 35,
      "dbl-sha2-256": 86,
      "md4": 212,
      "md5": 213,
      "bmt": 214,
      "sha2-256-trunc254-padded": 4114,
      "ripemd-128": 4178,
      "ripemd-160": 4179,
      "ripemd-256": 4180,
      "ripemd-320": 4181,
      "x11": 4352,
      "kangarootwelve": 7425,
      "sm3-256": 21325,
      "blake2b-8": 45569,
      "blake2b-16": 45570,
      "blake2b-24": 45571,
      "blake2b-32": 45572,
      "blake2b-40": 45573,
      "blake2b-48": 45574,
      "blake2b-56": 45575,
      "blake2b-64": 45576,
      "blake2b-72": 45577,
      "blake2b-80": 45578,
      "blake2b-88": 45579,
      "blake2b-96": 45580,
      "blake2b-104": 45581,
      "blake2b-112": 45582,
      "blake2b-120": 45583,
      "blake2b-128": 45584,
      "blake2b-136": 45585,
      "blake2b-144": 45586,
      "blake2b-152": 45587,
      "blake2b-160": 45588,
      "blake2b-168": 45589,
      "blake2b-176": 45590,
      "blake2b-184": 45591,
      "blake2b-192": 45592,
      "blake2b-200": 45593,
      "blake2b-208": 45594,
      "blake2b-216": 45595,
      "blake2b-224": 45596,
      "blake2b-232": 45597,
      "blake2b-240": 45598,
      "blake2b-248": 45599,
      "blake2b-256": 45600,
      "blake2b-264": 45601,
      "blake2b-272": 45602,
      "blake2b-280": 45603,
      "blake2b-288": 45604,
      "blake2b-296": 45605,
      "blake2b-304": 45606,
      "blake2b-312": 45607,
      "blake2b-320": 45608,
      "blake2b-328": 45609,
      "blake2b-336": 45610,
      "blake2b-344": 45611,
      "blake2b-352": 45612,
      "blake2b-360": 45613,
      "blake2b-368": 45614,
      "blake2b-376": 45615,
      "blake2b-384": 45616,
      "blake2b-392": 45617,
      "blake2b-400": 45618,
      "blake2b-408": 45619,
      "blake2b-416": 45620,
      "blake2b-424": 45621,
      "blake2b-432": 45622,
      "blake2b-440": 45623,
      "blake2b-448": 45624,
      "blake2b-456": 45625,
      "blake2b-464": 45626,
      "blake2b-472": 45627,
      "blake2b-480": 45628,
      "blake2b-488": 45629,
      "blake2b-496": 45630,
      "blake2b-504": 45631,
      "blake2b-512": 45632,
      "blake2s-8": 45633,
      "blake2s-16": 45634,
      "blake2s-24": 45635,
      "blake2s-32": 45636,
      "blake2s-40": 45637,
      "blake2s-48": 45638,
      "blake2s-56": 45639,
      "blake2s-64": 45640,
      "blake2s-72": 45641,
      "blake2s-80": 45642,
      "blake2s-88": 45643,
      "blake2s-96": 45644,
      "blake2s-104": 45645,
      "blake2s-112": 45646,
      "blake2s-120": 45647,
      "blake2s-128": 45648,
      "blake2s-136": 45649,
      "blake2s-144": 45650,
      "blake2s-152": 45651,
      "blake2s-160": 45652,
      "blake2s-168": 45653,
      "blake2s-176": 45654,
      "blake2s-184": 45655,
      "blake2s-192": 45656,
      "blake2s-200": 45657,
      "blake2s-208": 45658,
      "blake2s-216": 45659,
      "blake2s-224": 45660,
      "blake2s-232": 45661,
      "blake2s-240": 45662,
      "blake2s-248": 45663,
      "blake2s-256": 45664,
      "skein256-8": 45825,
      "skein256-16": 45826,
      "skein256-24": 45827,
      "skein256-32": 45828,
      "skein256-40": 45829,
      "skein256-48": 45830,
      "skein256-56": 45831,
      "skein256-64": 45832,
      "skein256-72": 45833,
      "skein256-80": 45834,
      "skein256-88": 45835,
      "skein256-96": 45836,
      "skein256-104": 45837,
      "skein256-112": 45838,
      "skein256-120": 45839,
      "skein256-128": 45840,
      "skein256-136": 45841,
      "skein256-144": 45842,
      "skein256-152": 45843,
      "skein256-160": 45844,
      "skein256-168": 45845,
      "skein256-176": 45846,
      "skein256-184": 45847,
      "skein256-192": 45848,
      "skein256-200": 45849,
      "skein256-208": 45850,
      "skein256-216": 45851,
      "skein256-224": 45852,
      "skein256-232": 45853,
      "skein256-240": 45854,
      "skein256-248": 45855,
      "skein256-256": 45856,
      "skein512-8": 45857,
      "skein512-16": 45858,
      "skein512-24": 45859,
      "skein512-32": 45860,
      "skein512-40": 45861,
      "skein512-48": 45862,
      "skein512-56": 45863,
      "skein512-64": 45864,
      "skein512-72": 45865,
      "skein512-80": 45866,
      "skein512-88": 45867,
      "skein512-96": 45868,
      "skein512-104": 45869,
      "skein512-112": 45870,
      "skein512-120": 45871,
      "skein512-128": 45872,
      "skein512-136": 45873,
      "skein512-144": 45874,
      "skein512-152": 45875,
      "skein512-160": 45876,
      "skein512-168": 45877,
      "skein512-176": 45878,
      "skein512-184": 45879,
      "skein512-192": 45880,
      "skein512-200": 45881,
      "skein512-208": 45882,
      "skein512-216": 45883,
      "skein512-224": 45884,
      "skein512-232": 45885,
      "skein512-240": 45886,
      "skein512-248": 45887,
      "skein512-256": 45888,
      "skein512-264": 45889,
      "skein512-272": 45890,
      "skein512-280": 45891,
      "skein512-288": 45892,
      "skein512-296": 45893,
      "skein512-304": 45894,
      "skein512-312": 45895,
      "skein512-320": 45896,
      "skein512-328": 45897,
      "skein512-336": 45898,
      "skein512-344": 45899,
      "skein512-352": 45900,
      "skein512-360": 45901,
      "skein512-368": 45902,
      "skein512-376": 45903,
      "skein512-384": 45904,
      "skein512-392": 45905,
      "skein512-400": 45906,
      "skein512-408": 45907,
      "skein512-416": 45908,
      "skein512-424": 45909,
      "skein512-432": 45910,
      "skein512-440": 45911,
      "skein512-448": 45912,
      "skein512-456": 45913,
      "skein512-464": 45914,
      "skein512-472": 45915,
      "skein512-480": 45916,
      "skein512-488": 45917,
      "skein512-496": 45918,
      "skein512-504": 45919,
      "skein512-512": 45920,
      "skein1024-8": 45921,
      "skein1024-16": 45922,
      "skein1024-24": 45923,
      "skein1024-32": 45924,
      "skein1024-40": 45925,
      "skein1024-48": 45926,
      "skein1024-56": 45927,
      "skein1024-64": 45928,
      "skein1024-72": 45929,
      "skein1024-80": 45930,
      "skein1024-88": 45931,
      "skein1024-96": 45932,
      "skein1024-104": 45933,
      "skein1024-112": 45934,
      "skein1024-120": 45935,
      "skein1024-128": 45936,
      "skein1024-136": 45937,
      "skein1024-144": 45938,
      "skein1024-152": 45939,
      "skein1024-160": 45940,
      "skein1024-168": 45941,
      "skein1024-176": 45942,
      "skein1024-184": 45943,
      "skein1024-192": 45944,
      "skein1024-200": 45945,
      "skein1024-208": 45946,
      "skein1024-216": 45947,
      "skein1024-224": 45948,
      "skein1024-232": 45949,
      "skein1024-240": 45950,
      "skein1024-248": 45951,
      "skein1024-256": 45952,
      "skein1024-264": 45953,
      "skein1024-272": 45954,
      "skein1024-280": 45955,
      "skein1024-288": 45956,
      "skein1024-296": 45957,
      "skein1024-304": 45958,
      "skein1024-312": 45959,
      "skein1024-320": 45960,
      "skein1024-328": 45961,
      "skein1024-336": 45962,
      "skein1024-344": 45963,
      "skein1024-352": 45964,
      "skein1024-360": 45965,
      "skein1024-368": 45966,
      "skein1024-376": 45967,
      "skein1024-384": 45968,
      "skein1024-392": 45969,
      "skein1024-400": 45970,
      "skein1024-408": 45971,
      "skein1024-416": 45972,
      "skein1024-424": 45973,
      "skein1024-432": 45974,
      "skein1024-440": 45975,
      "skein1024-448": 45976,
      "skein1024-456": 45977,
      "skein1024-464": 45978,
      "skein1024-472": 45979,
      "skein1024-480": 45980,
      "skein1024-488": 45981,
      "skein1024-496": 45982,
      "skein1024-504": 45983,
      "skein1024-512": 45984,
      "skein1024-520": 45985,
      "skein1024-528": 45986,
      "skein1024-536": 45987,
      "skein1024-544": 45988,
      "skein1024-552": 45989,
      "skein1024-560": 45990,
      "skein1024-568": 45991,
      "skein1024-576": 45992,
      "skein1024-584": 45993,
      "skein1024-592": 45994,
      "skein1024-600": 45995,
      "skein1024-608": 45996,
      "skein1024-616": 45997,
      "skein1024-624": 45998,
      "skein1024-632": 45999,
      "skein1024-640": 46e3,
      "skein1024-648": 46001,
      "skein1024-656": 46002,
      "skein1024-664": 46003,
      "skein1024-672": 46004,
      "skein1024-680": 46005,
      "skein1024-688": 46006,
      "skein1024-696": 46007,
      "skein1024-704": 46008,
      "skein1024-712": 46009,
      "skein1024-720": 46010,
      "skein1024-728": 46011,
      "skein1024-736": 46012,
      "skein1024-744": 46013,
      "skein1024-752": 46014,
      "skein1024-760": 46015,
      "skein1024-768": 46016,
      "skein1024-776": 46017,
      "skein1024-784": 46018,
      "skein1024-792": 46019,
      "skein1024-800": 46020,
      "skein1024-808": 46021,
      "skein1024-816": 46022,
      "skein1024-824": 46023,
      "skein1024-832": 46024,
      "skein1024-840": 46025,
      "skein1024-848": 46026,
      "skein1024-856": 46027,
      "skein1024-864": 46028,
      "skein1024-872": 46029,
      "skein1024-880": 46030,
      "skein1024-888": 46031,
      "skein1024-896": 46032,
      "skein1024-904": 46033,
      "skein1024-912": 46034,
      "skein1024-920": 46035,
      "skein1024-928": 46036,
      "skein1024-936": 46037,
      "skein1024-944": 46038,
      "skein1024-952": 46039,
      "skein1024-960": 46040,
      "skein1024-968": 46041,
      "skein1024-976": 46042,
      "skein1024-984": 46043,
      "skein1024-992": 46044,
      "skein1024-1000": 46045,
      "skein1024-1008": 46046,
      "skein1024-1016": 46047,
      "skein1024-1024": 46048,
      "poseidon-bls12_381-a2-fc1": 46081,
      "poseidon-bls12_381-a2-fc1-sc": 46082
    });
    module2.exports = { names };
  }
});

// ../../node_modules/multiformats/esm/vendor/base-x.js
function base(ALPHABET, name3) {
  if (ALPHABET.length >= 255) {
    throw new TypeError("Alphabet too long");
  }
  var BASE_MAP = new Uint8Array(256);
  for (var j = 0; j < BASE_MAP.length; j++) {
    BASE_MAP[j] = 255;
  }
  for (var i = 0; i < ALPHABET.length; i++) {
    var x = ALPHABET.charAt(i);
    var xc = x.charCodeAt(0);
    if (BASE_MAP[xc] !== 255) {
      throw new TypeError(x + " is ambiguous");
    }
    BASE_MAP[xc] = i;
  }
  var BASE = ALPHABET.length;
  var LEADER = ALPHABET.charAt(0);
  var FACTOR = Math.log(BASE) / Math.log(256);
  var iFACTOR = Math.log(256) / Math.log(BASE);
  function encode5(source) {
    if (source instanceof Uint8Array)
      ;
    else if (ArrayBuffer.isView(source)) {
      source = new Uint8Array(source.buffer, source.byteOffset, source.byteLength);
    } else if (Array.isArray(source)) {
      source = Uint8Array.from(source);
    }
    if (!(source instanceof Uint8Array)) {
      throw new TypeError("Expected Uint8Array");
    }
    if (source.length === 0) {
      return "";
    }
    var zeroes = 0;
    var length2 = 0;
    var pbegin = 0;
    var pend = source.length;
    while (pbegin !== pend && source[pbegin] === 0) {
      pbegin++;
      zeroes++;
    }
    var size = (pend - pbegin) * iFACTOR + 1 >>> 0;
    var b58 = new Uint8Array(size);
    while (pbegin !== pend) {
      var carry = source[pbegin];
      var i2 = 0;
      for (var it1 = size - 1; (carry !== 0 || i2 < length2) && it1 !== -1; it1--, i2++) {
        carry += 256 * b58[it1] >>> 0;
        b58[it1] = carry % BASE >>> 0;
        carry = carry / BASE >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      pbegin++;
    }
    var it2 = size - length2;
    while (it2 !== size && b58[it2] === 0) {
      it2++;
    }
    var str = LEADER.repeat(zeroes);
    for (; it2 < size; ++it2) {
      str += ALPHABET.charAt(b58[it2]);
    }
    return str;
  }
  function decodeUnsafe(source) {
    if (typeof source !== "string") {
      throw new TypeError("Expected String");
    }
    if (source.length === 0) {
      return new Uint8Array();
    }
    var psz = 0;
    if (source[psz] === " ") {
      return;
    }
    var zeroes = 0;
    var length2 = 0;
    while (source[psz] === LEADER) {
      zeroes++;
      psz++;
    }
    var size = (source.length - psz) * FACTOR + 1 >>> 0;
    var b256 = new Uint8Array(size);
    while (source[psz]) {
      var carry = BASE_MAP[source.charCodeAt(psz)];
      if (carry === 255) {
        return;
      }
      var i2 = 0;
      for (var it3 = size - 1; (carry !== 0 || i2 < length2) && it3 !== -1; it3--, i2++) {
        carry += BASE * b256[it3] >>> 0;
        b256[it3] = carry % 256 >>> 0;
        carry = carry / 256 >>> 0;
      }
      if (carry !== 0) {
        throw new Error("Non-zero carry");
      }
      length2 = i2;
      psz++;
    }
    if (source[psz] === " ") {
      return;
    }
    var it4 = size - length2;
    while (it4 !== size && b256[it4] === 0) {
      it4++;
    }
    var vch = new Uint8Array(zeroes + (size - it4));
    var j2 = zeroes;
    while (it4 !== size) {
      vch[j2++] = b256[it4++];
    }
    return vch;
  }
  function decode7(string2) {
    var buffer = decodeUnsafe(string2);
    if (buffer) {
      return buffer;
    }
    throw new Error(`Non-${name3} character`);
  }
  return {
    encode: encode5,
    decodeUnsafe,
    decode: decode7
  };
}
var src, _brrp__multiformats_scope_baseX, base_x_default;
var init_base_x = __esm({
  "../../node_modules/multiformats/esm/vendor/base-x.js"() {
    src = base;
    _brrp__multiformats_scope_baseX = src;
    base_x_default = _brrp__multiformats_scope_baseX;
  }
});

// ../../node_modules/multiformats/esm/src/bytes.js
var bytes_exports = {};
__export(bytes_exports, {
  coerce: () => coerce,
  empty: () => empty,
  equals: () => equals,
  fromHex: () => fromHex,
  fromString: () => fromString,
  isBinary: () => isBinary,
  toHex: () => toHex,
  toString: () => toString
});
var empty, toHex, fromHex, equals, coerce, isBinary, fromString, toString;
var init_bytes = __esm({
  "../../node_modules/multiformats/esm/src/bytes.js"() {
    empty = new Uint8Array(0);
    toHex = (d) => d.reduce((hex, byte) => hex + byte.toString(16).padStart(2, "0"), "");
    fromHex = (hex) => {
      const hexes = hex.match(/../g);
      return hexes ? new Uint8Array(hexes.map((b) => parseInt(b, 16))) : empty;
    };
    equals = (aa, bb) => {
      if (aa === bb)
        return true;
      if (aa.byteLength !== bb.byteLength) {
        return false;
      }
      for (let ii = 0; ii < aa.byteLength; ii++) {
        if (aa[ii] !== bb[ii]) {
          return false;
        }
      }
      return true;
    };
    coerce = (o) => {
      if (o instanceof Uint8Array && o.constructor.name === "Uint8Array")
        return o;
      if (o instanceof ArrayBuffer)
        return new Uint8Array(o);
      if (ArrayBuffer.isView(o)) {
        return new Uint8Array(o.buffer, o.byteOffset, o.byteLength);
      }
      throw new Error("Unknown type, must be binary type");
    };
    isBinary = (o) => o instanceof ArrayBuffer || ArrayBuffer.isView(o);
    fromString = (str) => new TextEncoder().encode(str);
    toString = (b) => new TextDecoder().decode(b);
  }
});

// ../../node_modules/multiformats/esm/src/bases/base.js
var Encoder, Decoder, ComposedDecoder, Codec, from, baseX, decode, encode, rfc4648;
var init_base = __esm({
  "../../node_modules/multiformats/esm/src/bases/base.js"() {
    init_base_x();
    init_bytes();
    Encoder = class {
      constructor(name3, prefix, baseEncode) {
        this.name = name3;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
      }
      encode(bytes) {
        if (bytes instanceof Uint8Array) {
          return `${this.prefix}${this.baseEncode(bytes)}`;
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
    Decoder = class {
      constructor(name3, prefix, baseDecode) {
        this.name = name3;
        this.prefix = prefix;
        this.baseDecode = baseDecode;
      }
      decode(text) {
        if (typeof text === "string") {
          switch (text[0]) {
            case this.prefix: {
              return this.baseDecode(text.slice(1));
            }
            default: {
              throw Error(`Unable to decode multibase string ${JSON.stringify(text)}, ${this.name} decoder only supports inputs prefixed with ${this.prefix}`);
            }
          }
        } else {
          throw Error("Can only multibase decode strings");
        }
      }
      or(decoder) {
        const decoders = {
          [this.prefix]: this,
          ...decoder.decoders || { [decoder.prefix]: decoder }
        };
        return new ComposedDecoder(decoders);
      }
    };
    ComposedDecoder = class {
      constructor(decoders) {
        this.decoders = decoders;
      }
      or(decoder) {
        const other = decoder.decoders || { [decoder.prefix]: decoder };
        return new ComposedDecoder({
          ...this.decoders,
          ...other
        });
      }
      decode(input) {
        const prefix = input[0];
        const decoder = this.decoders[prefix];
        if (decoder) {
          return decoder.decode(input);
        } else {
          throw RangeError(`Unable to decode multibase string ${JSON.stringify(input)}, only inputs prefixed with ${Object.keys(this.decoders)} are supported`);
        }
      }
    };
    Codec = class {
      constructor(name3, prefix, baseEncode, baseDecode) {
        this.name = name3;
        this.prefix = prefix;
        this.baseEncode = baseEncode;
        this.baseDecode = baseDecode;
        this.encoder = new Encoder(name3, prefix, baseEncode);
        this.decoder = new Decoder(name3, prefix, baseDecode);
      }
      encode(input) {
        return this.encoder.encode(input);
      }
      decode(input) {
        return this.decoder.decode(input);
      }
    };
    from = ({ name: name3, prefix, encode: encode5, decode: decode7 }) => new Codec(name3, prefix, encode5, decode7);
    baseX = ({ prefix, name: name3, alphabet }) => {
      const { encode: encode5, decode: decode7 } = base_x_default(alphabet, name3);
      return from({
        prefix,
        name: name3,
        encode: encode5,
        decode: (text) => coerce(decode7(text))
      });
    };
    decode = (string2, alphabet, bitsPerChar, name3) => {
      const codes = {};
      for (let i = 0; i < alphabet.length; ++i) {
        codes[alphabet[i]] = i;
      }
      let end = string2.length;
      while (string2[end - 1] === "=") {
        --end;
      }
      const out = new Uint8Array(end * bitsPerChar / 8 | 0);
      let bits = 0;
      let buffer = 0;
      let written = 0;
      for (let i = 0; i < end; ++i) {
        const value = codes[string2[i]];
        if (value === void 0) {
          throw new SyntaxError(`Non-${name3} character`);
        }
        buffer = buffer << bitsPerChar | value;
        bits += bitsPerChar;
        if (bits >= 8) {
          bits -= 8;
          out[written++] = 255 & buffer >> bits;
        }
      }
      if (bits >= bitsPerChar || 255 & buffer << 8 - bits) {
        throw new SyntaxError("Unexpected end of data");
      }
      return out;
    };
    encode = (data, alphabet, bitsPerChar) => {
      const pad = alphabet[alphabet.length - 1] === "=";
      const mask = (1 << bitsPerChar) - 1;
      let out = "";
      let bits = 0;
      let buffer = 0;
      for (let i = 0; i < data.length; ++i) {
        buffer = buffer << 8 | data[i];
        bits += 8;
        while (bits > bitsPerChar) {
          bits -= bitsPerChar;
          out += alphabet[mask & buffer >> bits];
        }
      }
      if (bits) {
        out += alphabet[mask & buffer << bitsPerChar - bits];
      }
      if (pad) {
        while (out.length * bitsPerChar & 7) {
          out += "=";
        }
      }
      return out;
    };
    rfc4648 = ({ name: name3, prefix, bitsPerChar, alphabet }) => {
      return from({
        prefix,
        name: name3,
        encode(input) {
          return encode(input, alphabet, bitsPerChar);
        },
        decode(input) {
          return decode(input, alphabet, bitsPerChar, name3);
        }
      });
    };
  }
});

// ../../node_modules/multiformats/esm/src/bases/identity.js
var identity_exports = {};
__export(identity_exports, {
  identity: () => identity
});
var identity;
var init_identity = __esm({
  "../../node_modules/multiformats/esm/src/bases/identity.js"() {
    init_base();
    init_bytes();
    identity = from({
      prefix: "\0",
      name: "identity",
      encode: (buf) => toString(buf),
      decode: (str) => fromString(str)
    });
  }
});

// ../../node_modules/multiformats/esm/src/bases/base2.js
var base2_exports = {};
__export(base2_exports, {
  base2: () => base2
});
var base2;
var init_base2 = __esm({
  "../../node_modules/multiformats/esm/src/bases/base2.js"() {
    init_base();
    base2 = rfc4648({
      prefix: "0",
      name: "base2",
      alphabet: "01",
      bitsPerChar: 1
    });
  }
});

// ../../node_modules/multiformats/esm/src/bases/base8.js
var base8_exports = {};
__export(base8_exports, {
  base8: () => base8
});
var base8;
var init_base8 = __esm({
  "../../node_modules/multiformats/esm/src/bases/base8.js"() {
    init_base();
    base8 = rfc4648({
      prefix: "7",
      name: "base8",
      alphabet: "01234567",
      bitsPerChar: 3
    });
  }
});

// ../../node_modules/multiformats/esm/src/bases/base10.js
var base10_exports = {};
__export(base10_exports, {
  base10: () => base10
});
var base10;
var init_base10 = __esm({
  "../../node_modules/multiformats/esm/src/bases/base10.js"() {
    init_base();
    base10 = baseX({
      prefix: "9",
      name: "base10",
      alphabet: "0123456789"
    });
  }
});

// ../../node_modules/multiformats/esm/src/bases/base16.js
var base16_exports = {};
__export(base16_exports, {
  base16: () => base16,
  base16upper: () => base16upper
});
var base16, base16upper;
var init_base16 = __esm({
  "../../node_modules/multiformats/esm/src/bases/base16.js"() {
    init_base();
    base16 = rfc4648({
      prefix: "f",
      name: "base16",
      alphabet: "0123456789abcdef",
      bitsPerChar: 4
    });
    base16upper = rfc4648({
      prefix: "F",
      name: "base16upper",
      alphabet: "0123456789ABCDEF",
      bitsPerChar: 4
    });
  }
});

// ../../node_modules/multiformats/esm/src/bases/base32.js
var base32_exports = {};
__export(base32_exports, {
  base32: () => base32,
  base32hex: () => base32hex,
  base32hexpad: () => base32hexpad,
  base32hexpadupper: () => base32hexpadupper,
  base32hexupper: () => base32hexupper,
  base32pad: () => base32pad,
  base32padupper: () => base32padupper,
  base32upper: () => base32upper,
  base32z: () => base32z
});
var base32, base32upper, base32pad, base32padupper, base32hex, base32hexupper, base32hexpad, base32hexpadupper, base32z;
var init_base32 = __esm({
  "../../node_modules/multiformats/esm/src/bases/base32.js"() {
    init_base();
    base32 = rfc4648({
      prefix: "b",
      name: "base32",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567",
      bitsPerChar: 5
    });
    base32upper = rfc4648({
      prefix: "B",
      name: "base32upper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567",
      bitsPerChar: 5
    });
    base32pad = rfc4648({
      prefix: "c",
      name: "base32pad",
      alphabet: "abcdefghijklmnopqrstuvwxyz234567=",
      bitsPerChar: 5
    });
    base32padupper = rfc4648({
      prefix: "C",
      name: "base32padupper",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZ234567=",
      bitsPerChar: 5
    });
    base32hex = rfc4648({
      prefix: "v",
      name: "base32hex",
      alphabet: "0123456789abcdefghijklmnopqrstuv",
      bitsPerChar: 5
    });
    base32hexupper = rfc4648({
      prefix: "V",
      name: "base32hexupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV",
      bitsPerChar: 5
    });
    base32hexpad = rfc4648({
      prefix: "t",
      name: "base32hexpad",
      alphabet: "0123456789abcdefghijklmnopqrstuv=",
      bitsPerChar: 5
    });
    base32hexpadupper = rfc4648({
      prefix: "T",
      name: "base32hexpadupper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUV=",
      bitsPerChar: 5
    });
    base32z = rfc4648({
      prefix: "h",
      name: "base32z",
      alphabet: "ybndrfg8ejkmcpqxot1uwisza345h769",
      bitsPerChar: 5
    });
  }
});

// ../../node_modules/multiformats/esm/src/bases/base36.js
var base36_exports = {};
__export(base36_exports, {
  base36: () => base36,
  base36upper: () => base36upper
});
var base36, base36upper;
var init_base36 = __esm({
  "../../node_modules/multiformats/esm/src/bases/base36.js"() {
    init_base();
    base36 = baseX({
      prefix: "k",
      name: "base36",
      alphabet: "0123456789abcdefghijklmnopqrstuvwxyz"
    });
    base36upper = baseX({
      prefix: "K",
      name: "base36upper",
      alphabet: "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ"
    });
  }
});

// ../../node_modules/multiformats/esm/src/bases/base58.js
var base58_exports = {};
__export(base58_exports, {
  base58btc: () => base58btc,
  base58flickr: () => base58flickr
});
var base58btc, base58flickr;
var init_base58 = __esm({
  "../../node_modules/multiformats/esm/src/bases/base58.js"() {
    init_base();
    base58btc = baseX({
      name: "base58btc",
      prefix: "z",
      alphabet: "123456789ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz"
    });
    base58flickr = baseX({
      name: "base58flickr",
      prefix: "Z",
      alphabet: "123456789abcdefghijkmnopqrstuvwxyzABCDEFGHJKLMNPQRSTUVWXYZ"
    });
  }
});

// ../../node_modules/multiformats/esm/src/bases/base64.js
var base64_exports = {};
__export(base64_exports, {
  base64: () => base64,
  base64pad: () => base64pad,
  base64url: () => base64url,
  base64urlpad: () => base64urlpad
});
var base64, base64pad, base64url, base64urlpad;
var init_base64 = __esm({
  "../../node_modules/multiformats/esm/src/bases/base64.js"() {
    init_base();
    base64 = rfc4648({
      prefix: "m",
      name: "base64",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",
      bitsPerChar: 6
    });
    base64pad = rfc4648({
      prefix: "M",
      name: "base64pad",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=",
      bitsPerChar: 6
    });
    base64url = rfc4648({
      prefix: "u",
      name: "base64url",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_",
      bitsPerChar: 6
    });
    base64urlpad = rfc4648({
      prefix: "U",
      name: "base64urlpad",
      alphabet: "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789-_=",
      bitsPerChar: 6
    });
  }
});

// ../../node_modules/multiformats/esm/vendor/varint.js
function encode2(num, out, offset) {
  out = out || [];
  offset = offset || 0;
  var oldOffset = offset;
  while (num >= INT) {
    out[offset++] = num & 255 | MSB;
    num /= 128;
  }
  while (num & MSBALL) {
    out[offset++] = num & 255 | MSB;
    num >>>= 7;
  }
  out[offset] = num | 0;
  encode2.bytes = offset - oldOffset + 1;
  return out;
}
function read(buf, offset) {
  var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
  do {
    if (counter >= l) {
      read.bytes = 0;
      throw new RangeError("Could not decode varint");
    }
    b = buf[counter++];
    res += shift < 28 ? (b & REST$1) << shift : (b & REST$1) * Math.pow(2, shift);
    shift += 7;
  } while (b >= MSB$1);
  read.bytes = counter - offset;
  return res;
}
var encode_1, MSB, REST, MSBALL, INT, decode2, MSB$1, REST$1, N1, N2, N3, N4, N5, N6, N7, N8, N9, length, varint, _brrp_varint, varint_default;
var init_varint = __esm({
  "../../node_modules/multiformats/esm/vendor/varint.js"() {
    encode_1 = encode2;
    MSB = 128;
    REST = 127;
    MSBALL = ~REST;
    INT = Math.pow(2, 31);
    decode2 = read;
    MSB$1 = 128;
    REST$1 = 127;
    N1 = Math.pow(2, 7);
    N2 = Math.pow(2, 14);
    N3 = Math.pow(2, 21);
    N4 = Math.pow(2, 28);
    N5 = Math.pow(2, 35);
    N6 = Math.pow(2, 42);
    N7 = Math.pow(2, 49);
    N8 = Math.pow(2, 56);
    N9 = Math.pow(2, 63);
    length = function(value) {
      return value < N1 ? 1 : value < N2 ? 2 : value < N3 ? 3 : value < N4 ? 4 : value < N5 ? 5 : value < N6 ? 6 : value < N7 ? 7 : value < N8 ? 8 : value < N9 ? 9 : 10;
    };
    varint = {
      encode: encode_1,
      decode: decode2,
      encodingLength: length
    };
    _brrp_varint = varint;
    varint_default = _brrp_varint;
  }
});

// ../../node_modules/multiformats/esm/src/varint.js
var varint_exports = {};
__export(varint_exports, {
  decode: () => decode3,
  encodeTo: () => encodeTo,
  encodingLength: () => encodingLength
});
var decode3, encodeTo, encodingLength;
var init_varint2 = __esm({
  "../../node_modules/multiformats/esm/src/varint.js"() {
    init_varint();
    decode3 = (data) => {
      const code3 = varint_default.decode(data);
      return [
        code3,
        varint_default.decode.bytes
      ];
    };
    encodeTo = (int, target, offset = 0) => {
      varint_default.encode(int, target, offset);
      return target;
    };
    encodingLength = (int) => {
      return varint_default.encodingLength(int);
    };
  }
});

// ../../node_modules/multiformats/esm/src/hashes/digest.js
var digest_exports = {};
__export(digest_exports, {
  Digest: () => Digest,
  create: () => create,
  decode: () => decode4,
  equals: () => equals2
});
var create, decode4, equals2, Digest;
var init_digest = __esm({
  "../../node_modules/multiformats/esm/src/hashes/digest.js"() {
    init_bytes();
    init_varint2();
    create = (code3, digest) => {
      const size = digest.byteLength;
      const sizeOffset = encodingLength(code3);
      const digestOffset = sizeOffset + encodingLength(size);
      const bytes = new Uint8Array(digestOffset + size);
      encodeTo(code3, bytes, 0);
      encodeTo(size, bytes, sizeOffset);
      bytes.set(digest, digestOffset);
      return new Digest(code3, size, digest, bytes);
    };
    decode4 = (multihash) => {
      const bytes = coerce(multihash);
      const [code3, sizeOffset] = decode3(bytes);
      const [size, digestOffset] = decode3(bytes.subarray(sizeOffset));
      const digest = bytes.subarray(sizeOffset + digestOffset);
      if (digest.byteLength !== size) {
        throw new Error("Incorrect length");
      }
      return new Digest(code3, size, digest, bytes);
    };
    equals2 = (a, b) => {
      if (a === b) {
        return true;
      } else {
        return a.code === b.code && a.size === b.size && equals(a.bytes, b.bytes);
      }
    };
    Digest = class {
      constructor(code3, size, digest, bytes) {
        this.code = code3;
        this.size = size;
        this.digest = digest;
        this.bytes = bytes;
      }
    };
  }
});

// ../../node_modules/multiformats/esm/src/hashes/hasher.js
var hasher_exports = {};
__export(hasher_exports, {
  Hasher: () => Hasher,
  from: () => from2
});
var from2, Hasher;
var init_hasher = __esm({
  "../../node_modules/multiformats/esm/src/hashes/hasher.js"() {
    init_digest();
    from2 = ({ name: name3, code: code3, encode: encode5 }) => new Hasher(name3, code3, encode5);
    Hasher = class {
      constructor(name3, code3, encode5) {
        this.name = name3;
        this.code = code3;
        this.encode = encode5;
      }
      async digest(input) {
        if (input instanceof Uint8Array) {
          const digest = await this.encode(input);
          return create(this.code, digest);
        } else {
          throw Error("Unknown type, must be binary type");
        }
      }
    };
  }
});

// ../../node_modules/multiformats/esm/src/hashes/sha2-browser.js
var sha2_browser_exports = {};
__export(sha2_browser_exports, {
  sha256: () => sha256,
  sha512: () => sha512
});
var sha, sha256, sha512;
var init_sha2_browser = __esm({
  "../../node_modules/multiformats/esm/src/hashes/sha2-browser.js"() {
    init_hasher();
    sha = (name3) => async (data) => new Uint8Array(await crypto.subtle.digest(name3, data));
    sha256 = from2({
      name: "sha2-256",
      code: 18,
      encode: sha("SHA-256")
    });
    sha512 = from2({
      name: "sha2-512",
      code: 19,
      encode: sha("SHA-512")
    });
  }
});

// ../../node_modules/multiformats/esm/src/hashes/identity.js
var identity_exports2 = {};
__export(identity_exports2, {
  identity: () => identity2
});
var identity2;
var init_identity2 = __esm({
  "../../node_modules/multiformats/esm/src/hashes/identity.js"() {
    init_hasher();
    init_bytes();
    identity2 = from2({
      name: "identity",
      code: 0,
      encode: (input) => coerce(input)
    });
  }
});

// ../../node_modules/multiformats/esm/src/codecs/raw.js
var raw_exports = {};
__export(raw_exports, {
  code: () => code,
  decode: () => decode5,
  encode: () => encode3,
  name: () => name
});
var name, code, encode3, decode5;
var init_raw = __esm({
  "../../node_modules/multiformats/esm/src/codecs/raw.js"() {
    init_bytes();
    name = "raw";
    code = 85;
    encode3 = (node) => coerce(node);
    decode5 = (data) => coerce(data);
  }
});

// ../../node_modules/multiformats/esm/src/codecs/json.js
var json_exports = {};
__export(json_exports, {
  code: () => code2,
  decode: () => decode6,
  encode: () => encode4,
  name: () => name2
});
var textEncoder, textDecoder, name2, code2, encode4, decode6;
var init_json = __esm({
  "../../node_modules/multiformats/esm/src/codecs/json.js"() {
    textEncoder = new TextEncoder();
    textDecoder = new TextDecoder();
    name2 = "json";
    code2 = 512;
    encode4 = (node) => textEncoder.encode(JSON.stringify(node));
    decode6 = (data) => JSON.parse(textDecoder.decode(data));
  }
});

// ../../node_modules/multiformats/esm/src/cid.js
var CID, parseCIDtoBytes, toStringV0, toStringV1, DAG_PB_CODE, SHA_256_CODE, encodeCID, cidSymbol, readonly, hidden, version2, deprecate, IS_CID_DEPRECATION;
var init_cid = __esm({
  "../../node_modules/multiformats/esm/src/cid.js"() {
    init_varint2();
    init_digest();
    init_base58();
    init_base32();
    init_bytes();
    CID = class {
      constructor(version3, code3, multihash, bytes) {
        this.code = code3;
        this.version = version3;
        this.multihash = multihash;
        this.bytes = bytes;
        this.byteOffset = bytes.byteOffset;
        this.byteLength = bytes.byteLength;
        this.asCID = this;
        this._baseCache = new Map();
        Object.defineProperties(this, {
          byteOffset: hidden,
          byteLength: hidden,
          code: readonly,
          version: readonly,
          multihash: readonly,
          bytes: readonly,
          _baseCache: hidden,
          asCID: hidden
        });
      }
      toV0() {
        switch (this.version) {
          case 0: {
            return this;
          }
          default: {
            const { code: code3, multihash } = this;
            if (code3 !== DAG_PB_CODE) {
              throw new Error("Cannot convert a non dag-pb CID to CIDv0");
            }
            if (multihash.code !== SHA_256_CODE) {
              throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
            }
            return CID.createV0(multihash);
          }
        }
      }
      toV1() {
        switch (this.version) {
          case 0: {
            const { code: code3, digest } = this.multihash;
            const multihash = create(code3, digest);
            return CID.createV1(this.code, multihash);
          }
          case 1: {
            return this;
          }
          default: {
            throw Error(`Can not convert CID version ${this.version} to version 0. This is a bug please report`);
          }
        }
      }
      equals(other) {
        return other && this.code === other.code && this.version === other.version && equals2(this.multihash, other.multihash);
      }
      toString(base3) {
        const { bytes, version: version3, _baseCache } = this;
        switch (version3) {
          case 0:
            return toStringV0(bytes, _baseCache, base3 || base58btc.encoder);
          default:
            return toStringV1(bytes, _baseCache, base3 || base32.encoder);
        }
      }
      toJSON() {
        return {
          code: this.code,
          version: this.version,
          hash: this.multihash.bytes
        };
      }
      get [Symbol.toStringTag]() {
        return "CID";
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
      }
      static isCID(value) {
        deprecate(/^0\.0/, IS_CID_DEPRECATION);
        return !!(value && (value[cidSymbol] || value.asCID === value));
      }
      get toBaseEncodedString() {
        throw new Error("Deprecated, use .toString()");
      }
      get codec() {
        throw new Error('"codec" property is deprecated, use integer "code" property instead');
      }
      get buffer() {
        throw new Error("Deprecated .buffer property, use .bytes to get Uint8Array instead");
      }
      get multibaseName() {
        throw new Error('"multibaseName" property is deprecated');
      }
      get prefix() {
        throw new Error('"prefix" property is deprecated');
      }
      static asCID(value) {
        if (value instanceof CID) {
          return value;
        } else if (value != null && value.asCID === value) {
          const { version: version3, code: code3, multihash, bytes } = value;
          return new CID(version3, code3, multihash, bytes || encodeCID(version3, code3, multihash.bytes));
        } else if (value != null && value[cidSymbol] === true) {
          const { version: version3, multihash, code: code3 } = value;
          const digest = decode4(multihash);
          return CID.create(version3, code3, digest);
        } else {
          return null;
        }
      }
      static create(version3, code3, digest) {
        if (typeof code3 !== "number") {
          throw new Error("String codecs are no longer supported");
        }
        switch (version3) {
          case 0: {
            if (code3 !== DAG_PB_CODE) {
              throw new Error(`Version 0 CID must use dag-pb (code: ${DAG_PB_CODE}) block encoding`);
            } else {
              return new CID(version3, code3, digest, digest.bytes);
            }
          }
          case 1: {
            const bytes = encodeCID(version3, code3, digest.bytes);
            return new CID(version3, code3, digest, bytes);
          }
          default: {
            throw new Error("Invalid version");
          }
        }
      }
      static createV0(digest) {
        return CID.create(0, DAG_PB_CODE, digest);
      }
      static createV1(code3, digest) {
        return CID.create(1, code3, digest);
      }
      static decode(bytes) {
        const [cid, remainder] = CID.decodeFirst(bytes);
        if (remainder.length) {
          throw new Error("Incorrect length");
        }
        return cid;
      }
      static decodeFirst(bytes) {
        const specs = CID.inspectBytes(bytes);
        const prefixSize = specs.size - specs.multihashSize;
        const multihashBytes = coerce(bytes.subarray(prefixSize, prefixSize + specs.multihashSize));
        if (multihashBytes.byteLength !== specs.multihashSize) {
          throw new Error("Incorrect length");
        }
        const digestBytes = multihashBytes.subarray(specs.multihashSize - specs.digestSize);
        const digest = new Digest(specs.multihashCode, specs.digestSize, digestBytes, multihashBytes);
        const cid = specs.version === 0 ? CID.createV0(digest) : CID.createV1(specs.codec, digest);
        return [
          cid,
          bytes.subarray(specs.size)
        ];
      }
      static inspectBytes(initialBytes) {
        let offset = 0;
        const next = () => {
          const [i, length2] = decode3(initialBytes.subarray(offset));
          offset += length2;
          return i;
        };
        let version3 = next();
        let codec = DAG_PB_CODE;
        if (version3 === 18) {
          version3 = 0;
          offset = 0;
        } else if (version3 === 1) {
          codec = next();
        }
        if (version3 !== 0 && version3 !== 1) {
          throw new RangeError(`Invalid CID version ${version3}`);
        }
        const prefixSize = offset;
        const multihashCode = next();
        const digestSize = next();
        const size = offset + digestSize;
        const multihashSize = size - prefixSize;
        return {
          version: version3,
          codec,
          multihashCode,
          digestSize,
          multihashSize,
          size
        };
      }
      static parse(source, base3) {
        const [prefix, bytes] = parseCIDtoBytes(source, base3);
        const cid = CID.decode(bytes);
        cid._baseCache.set(prefix, source);
        return cid;
      }
    };
    parseCIDtoBytes = (source, base3) => {
      switch (source[0]) {
        case "Q": {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(`${base58btc.prefix}${source}`)
          ];
        }
        case base58btc.prefix: {
          const decoder = base3 || base58btc;
          return [
            base58btc.prefix,
            decoder.decode(source)
          ];
        }
        case base32.prefix: {
          const decoder = base3 || base32;
          return [
            base32.prefix,
            decoder.decode(source)
          ];
        }
        default: {
          if (base3 == null) {
            throw Error("To parse non base32 or base58btc encoded CID multibase decoder must be provided");
          }
          return [
            source[0],
            base3.decode(source)
          ];
        }
      }
    };
    toStringV0 = (bytes, cache, base3) => {
      const { prefix } = base3;
      if (prefix !== base58btc.prefix) {
        throw Error(`Cannot string encode V0 in ${base3.name} encoding`);
      }
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes).slice(1);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    toStringV1 = (bytes, cache, base3) => {
      const { prefix } = base3;
      const cid = cache.get(prefix);
      if (cid == null) {
        const cid2 = base3.encode(bytes);
        cache.set(prefix, cid2);
        return cid2;
      } else {
        return cid;
      }
    };
    DAG_PB_CODE = 112;
    SHA_256_CODE = 18;
    encodeCID = (version3, code3, multihash) => {
      const codeOffset = encodingLength(version3);
      const hashOffset = codeOffset + encodingLength(code3);
      const bytes = new Uint8Array(hashOffset + multihash.byteLength);
      encodeTo(version3, bytes, 0);
      encodeTo(code3, bytes, codeOffset);
      bytes.set(multihash, hashOffset);
      return bytes;
    };
    cidSymbol = Symbol.for("@ipld/js-cid/CID");
    readonly = {
      writable: false,
      configurable: false,
      enumerable: true
    };
    hidden = {
      writable: false,
      enumerable: false,
      configurable: false
    };
    version2 = "0.0.0-dev";
    deprecate = (range, message) => {
      if (range.test(version2)) {
        console.warn(message);
      } else {
        throw new Error(message);
      }
    };
    IS_CID_DEPRECATION = `CID.isCID(v) is deprecated and will be removed in the next major release.
Following code pattern:

if (CID.isCID(value)) {
  doSomethingWithCID(value)
}

Is replaced with:

const cid = CID.asCID(value)
if (cid) {
  // Make sure to use cid instead of value
  doSomethingWithCID(cid)
}
`;
  }
});

// ../../node_modules/multiformats/esm/src/index.js
var init_src = __esm({
  "../../node_modules/multiformats/esm/src/index.js"() {
    init_cid();
    init_varint2();
    init_bytes();
    init_hasher();
    init_digest();
  }
});

// ../../node_modules/multiformats/esm/src/basics.js
var basics_exports = {};
__export(basics_exports, {
  CID: () => CID,
  bases: () => bases,
  bytes: () => bytes_exports,
  codecs: () => codecs,
  digest: () => digest_exports,
  hasher: () => hasher_exports,
  hashes: () => hashes,
  varint: () => varint_exports
});
var bases, hashes, codecs;
var init_basics = __esm({
  "../../node_modules/multiformats/esm/src/basics.js"() {
    init_identity();
    init_base2();
    init_base8();
    init_base10();
    init_base16();
    init_base32();
    init_base36();
    init_base58();
    init_base64();
    init_sha2_browser();
    init_identity2();
    init_raw();
    init_json();
    init_src();
    bases = {
      ...identity_exports,
      ...base2_exports,
      ...base8_exports,
      ...base10_exports,
      ...base16_exports,
      ...base32_exports,
      ...base36_exports,
      ...base58_exports,
      ...base64_exports
    };
    hashes = {
      ...sha2_browser_exports,
      ...identity_exports2
    };
    codecs = {
      raw: raw_exports,
      json: json_exports
    };
  }
});

// ../../node_modules/uint8arrays/esm/src/util/bases.js
function createCodec(name3, prefix, encode5, decode7) {
  return {
    name: name3,
    prefix,
    encoder: {
      name: name3,
      prefix,
      encode: encode5
    },
    decoder: { decode: decode7 }
  };
}
var string, ascii, BASES, bases_default;
var init_bases = __esm({
  "../../node_modules/uint8arrays/esm/src/util/bases.js"() {
    init_basics();
    string = createCodec("utf8", "u", (buf) => {
      const decoder = new TextDecoder("utf8");
      return "u" + decoder.decode(buf);
    }, (str) => {
      const encoder = new TextEncoder();
      return encoder.encode(str.substring(1));
    });
    ascii = createCodec("ascii", "a", (buf) => {
      let string2 = "a";
      for (let i = 0; i < buf.length; i++) {
        string2 += String.fromCharCode(buf[i]);
      }
      return string2;
    }, (str) => {
      str = str.substring(1);
      const buf = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i);
      }
      return buf;
    });
    BASES = {
      utf8: string,
      "utf-8": string,
      hex: bases.base16,
      latin1: ascii,
      ascii,
      binary: ascii,
      ...bases
    };
    bases_default = BASES;
  }
});

// ../../node_modules/uint8arrays/esm/src/to-string.js
var to_string_exports = {};
__export(to_string_exports, {
  toString: () => toString2
});
function toString2(array, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.encoder.encode(array).substring(1);
}
var init_to_string = __esm({
  "../../node_modules/uint8arrays/esm/src/to-string.js"() {
    init_bases();
  }
});

// ../../node_modules/uint8arrays/esm/src/from-string.js
var from_string_exports = {};
__export(from_string_exports, {
  fromString: () => fromString2
});
function fromString2(string2, encoding = "utf8") {
  const base3 = bases_default[encoding];
  if (!base3) {
    throw new Error(`Unsupported encoding "${encoding}"`);
  }
  return base3.decoder.decode(`${base3.prefix}${string2}`);
}
var init_from_string = __esm({
  "../../node_modules/uint8arrays/esm/src/from-string.js"() {
    init_bases();
  }
});

// ../../node_modules/uint8arrays/esm/src/concat.js
var concat_exports = {};
__export(concat_exports, {
  concat: () => concat
});
function concat(arrays, length2) {
  if (!length2) {
    length2 = arrays.reduce((acc, curr) => acc + curr.length, 0);
  }
  const output = new Uint8Array(length2);
  let offset = 0;
  for (const arr of arrays) {
    output.set(arr, offset);
    offset += arr.length;
  }
  return output;
}
var init_concat = __esm({
  "../../node_modules/uint8arrays/esm/src/concat.js"() {
  }
});

// ../../node_modules/multihashes/src/index.js
var require_src3 = __commonJS({
  "../../node_modules/multihashes/src/index.js"(exports2, module2) {
    "use strict";
    var multibase = require_src2();
    var varint4 = require_varint();
    var { names } = require_constants2();
    var { toString: uint8ArrayToString } = (init_to_string(), to_string_exports);
    var { fromString: uint8ArrayFromString } = (init_from_string(), from_string_exports);
    var { concat: uint8ArrayConcat } = (init_concat(), concat_exports);
    var codes = {};
    for (const key in names) {
      const name3 = key;
      codes[names[name3]] = name3;
    }
    Object.freeze(codes);
    function toHexString(hash) {
      if (!(hash instanceof Uint8Array)) {
        throw new Error("must be passed a Uint8Array");
      }
      return uint8ArrayToString(hash, "base16");
    }
    function fromHexString(hash) {
      return uint8ArrayFromString(hash, "base16");
    }
    function toB58String(hash) {
      if (!(hash instanceof Uint8Array)) {
        throw new Error("must be passed a Uint8Array");
      }
      return uint8ArrayToString(multibase.encode("base58btc", hash)).slice(1);
    }
    function fromB58String(hash) {
      const encoded = hash instanceof Uint8Array ? uint8ArrayToString(hash) : hash;
      return multibase.decode("z" + encoded);
    }
    function decode7(bytes) {
      if (!(bytes instanceof Uint8Array)) {
        throw new Error("multihash must be a Uint8Array");
      }
      if (bytes.length < 2) {
        throw new Error("multihash too short. must be > 2 bytes.");
      }
      const code3 = varint4.decode(bytes);
      if (!isValidCode(code3)) {
        throw new Error(`multihash unknown function code: 0x${code3.toString(16)}`);
      }
      bytes = bytes.slice(varint4.decode.bytes);
      const len = varint4.decode(bytes);
      if (len < 0) {
        throw new Error(`multihash invalid length: ${len}`);
      }
      bytes = bytes.slice(varint4.decode.bytes);
      if (bytes.length !== len) {
        throw new Error(`multihash length inconsistent: 0x${uint8ArrayToString(bytes, "base16")}`);
      }
      return {
        code: code3,
        name: codes[code3],
        length: len,
        digest: bytes
      };
    }
    function encode5(digest, code3, length2) {
      if (!digest || code3 === void 0) {
        throw new Error("multihash encode requires at least two args: digest, code");
      }
      const hashfn = coerceCode(code3);
      if (!(digest instanceof Uint8Array)) {
        throw new Error("digest should be a Uint8Array");
      }
      if (length2 == null) {
        length2 = digest.length;
      }
      if (length2 && digest.length !== length2) {
        throw new Error("digest length should be equal to specified length.");
      }
      const hash = varint4.encode(hashfn);
      const len = varint4.encode(length2);
      return uint8ArrayConcat([hash, len, digest], hash.length + len.length + digest.length);
    }
    function coerceCode(name3) {
      let code3 = name3;
      if (typeof name3 === "string") {
        if (names[name3] === void 0) {
          throw new Error(`Unrecognized hash function named: ${name3}`);
        }
        code3 = names[name3];
      }
      if (typeof code3 !== "number") {
        throw new Error(`Hash function code should be a number. Got: ${code3}`);
      }
      if (codes[code3] === void 0 && !isAppCode(code3)) {
        throw new Error(`Unrecognized function code: ${code3}`);
      }
      return code3;
    }
    function isAppCode(code3) {
      return code3 > 0 && code3 < 16;
    }
    function isValidCode(code3) {
      if (isAppCode(code3)) {
        return true;
      }
      if (codes[code3]) {
        return true;
      }
      return false;
    }
    function validate(multihash) {
      decode7(multihash);
    }
    function prefix(multihash) {
      validate(multihash);
      return multihash.subarray(0, 2);
    }
    module2.exports = {
      names,
      codes,
      toHexString,
      fromHexString,
      toB58String,
      fromB58String,
      decode: decode7,
      encode: encode5,
      coerceCode,
      isAppCode,
      validate,
      prefix,
      isValidCode
    };
  }
});

// ../../node_modules/js-sha3/src/sha3.js
var require_sha3 = __commonJS({
  "../../node_modules/js-sha3/src/sha3.js"(exports2, module2) {
    (function() {
      "use strict";
      var INPUT_ERROR = "input is invalid type";
      var FINALIZE_ERROR = "finalize already called";
      var WINDOW = typeof window === "object";
      var root = WINDOW ? window : {};
      if (root.JS_SHA3_NO_WINDOW) {
        WINDOW = false;
      }
      var WEB_WORKER = !WINDOW && typeof self === "object";
      var NODE_JS = !root.JS_SHA3_NO_NODE_JS && typeof process === "object" && process.versions && process.versions.node;
      if (NODE_JS) {
        root = global;
      } else if (WEB_WORKER) {
        root = self;
      }
      var COMMON_JS = !root.JS_SHA3_NO_COMMON_JS && typeof module2 === "object" && module2.exports;
      var AMD = typeof define === "function" && define.amd;
      var ARRAY_BUFFER = !root.JS_SHA3_NO_ARRAY_BUFFER && typeof ArrayBuffer !== "undefined";
      var HEX_CHARS = "0123456789abcdef".split("");
      var SHAKE_PADDING = [31, 7936, 2031616, 520093696];
      var CSHAKE_PADDING = [4, 1024, 262144, 67108864];
      var KECCAK_PADDING = [1, 256, 65536, 16777216];
      var PADDING = [6, 1536, 393216, 100663296];
      var SHIFT = [0, 8, 16, 24];
      var RC = [
        1,
        0,
        32898,
        0,
        32906,
        2147483648,
        2147516416,
        2147483648,
        32907,
        0,
        2147483649,
        0,
        2147516545,
        2147483648,
        32777,
        2147483648,
        138,
        0,
        136,
        0,
        2147516425,
        0,
        2147483658,
        0,
        2147516555,
        0,
        139,
        2147483648,
        32905,
        2147483648,
        32771,
        2147483648,
        32770,
        2147483648,
        128,
        2147483648,
        32778,
        0,
        2147483658,
        2147483648,
        2147516545,
        2147483648,
        32896,
        2147483648,
        2147483649,
        0,
        2147516424,
        2147483648
      ];
      var BITS = [224, 256, 384, 512];
      var SHAKE_BITS = [128, 256];
      var OUTPUT_TYPES = ["hex", "buffer", "arrayBuffer", "array", "digest"];
      var CSHAKE_BYTEPAD = {
        "128": 168,
        "256": 136
      };
      if (root.JS_SHA3_NO_NODE_JS || !Array.isArray) {
        Array.isArray = function(obj) {
          return Object.prototype.toString.call(obj) === "[object Array]";
        };
      }
      if (ARRAY_BUFFER && (root.JS_SHA3_NO_ARRAY_BUFFER_IS_VIEW || !ArrayBuffer.isView)) {
        ArrayBuffer.isView = function(obj) {
          return typeof obj === "object" && obj.buffer && obj.buffer.constructor === ArrayBuffer;
        };
      }
      var createOutputMethod = function(bits2, padding, outputType) {
        return function(message) {
          return new Keccak(bits2, padding, bits2).update(message)[outputType]();
        };
      };
      var createShakeOutputMethod = function(bits2, padding, outputType) {
        return function(message, outputBits) {
          return new Keccak(bits2, padding, outputBits).update(message)[outputType]();
        };
      };
      var createCshakeOutputMethod = function(bits2, padding, outputType) {
        return function(message, outputBits, n, s) {
          return methods["cshake" + bits2].update(message, outputBits, n, s)[outputType]();
        };
      };
      var createKmacOutputMethod = function(bits2, padding, outputType) {
        return function(key, message, outputBits, s) {
          return methods["kmac" + bits2].update(key, message, outputBits, s)[outputType]();
        };
      };
      var createOutputMethods = function(method, createMethod2, bits2, padding) {
        for (var i2 = 0; i2 < OUTPUT_TYPES.length; ++i2) {
          var type = OUTPUT_TYPES[i2];
          method[type] = createMethod2(bits2, padding, type);
        }
        return method;
      };
      var createMethod = function(bits2, padding) {
        var method = createOutputMethod(bits2, padding, "hex");
        method.create = function() {
          return new Keccak(bits2, padding, bits2);
        };
        method.update = function(message) {
          return method.create().update(message);
        };
        return createOutputMethods(method, createOutputMethod, bits2, padding);
      };
      var createShakeMethod = function(bits2, padding) {
        var method = createShakeOutputMethod(bits2, padding, "hex");
        method.create = function(outputBits) {
          return new Keccak(bits2, padding, outputBits);
        };
        method.update = function(message, outputBits) {
          return method.create(outputBits).update(message);
        };
        return createOutputMethods(method, createShakeOutputMethod, bits2, padding);
      };
      var createCshakeMethod = function(bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2];
        var method = createCshakeOutputMethod(bits2, padding, "hex");
        method.create = function(outputBits, n, s) {
          if (!n && !s) {
            return methods["shake" + bits2].create(outputBits);
          } else {
            return new Keccak(bits2, padding, outputBits).bytepad([n, s], w);
          }
        };
        method.update = function(message, outputBits, n, s) {
          return method.create(outputBits, n, s).update(message);
        };
        return createOutputMethods(method, createCshakeOutputMethod, bits2, padding);
      };
      var createKmacMethod = function(bits2, padding) {
        var w = CSHAKE_BYTEPAD[bits2];
        var method = createKmacOutputMethod(bits2, padding, "hex");
        method.create = function(key, outputBits, s) {
          return new Kmac(bits2, padding, outputBits).bytepad(["KMAC", s], w).bytepad([key], w);
        };
        method.update = function(key, message, outputBits, s) {
          return method.create(key, outputBits, s).update(message);
        };
        return createOutputMethods(method, createKmacOutputMethod, bits2, padding);
      };
      var algorithms = [
        { name: "keccak", padding: KECCAK_PADDING, bits: BITS, createMethod },
        { name: "sha3", padding: PADDING, bits: BITS, createMethod },
        { name: "shake", padding: SHAKE_PADDING, bits: SHAKE_BITS, createMethod: createShakeMethod },
        { name: "cshake", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createCshakeMethod },
        { name: "kmac", padding: CSHAKE_PADDING, bits: SHAKE_BITS, createMethod: createKmacMethod }
      ];
      var methods = {}, methodNames = [];
      for (var i = 0; i < algorithms.length; ++i) {
        var algorithm = algorithms[i];
        var bits = algorithm.bits;
        for (var j = 0; j < bits.length; ++j) {
          var methodName = algorithm.name + "_" + bits[j];
          methodNames.push(methodName);
          methods[methodName] = algorithm.createMethod(bits[j], algorithm.padding);
          if (algorithm.name !== "sha3") {
            var newMethodName = algorithm.name + bits[j];
            methodNames.push(newMethodName);
            methods[newMethodName] = methods[methodName];
          }
        }
      }
      function Keccak(bits2, padding, outputBits) {
        this.blocks = [];
        this.s = [];
        this.padding = padding;
        this.outputBits = outputBits;
        this.reset = true;
        this.finalized = false;
        this.block = 0;
        this.start = 0;
        this.blockCount = 1600 - (bits2 << 1) >> 5;
        this.byteCount = this.blockCount << 2;
        this.outputBlocks = outputBits >> 5;
        this.extraBytes = (outputBits & 31) >> 3;
        for (var i2 = 0; i2 < 50; ++i2) {
          this.s[i2] = 0;
        }
      }
      Keccak.prototype.update = function(message) {
        if (this.finalized) {
          throw new Error(FINALIZE_ERROR);
        }
        var notString, type = typeof message;
        if (type !== "string") {
          if (type === "object") {
            if (message === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && message.constructor === ArrayBuffer) {
              message = new Uint8Array(message);
            } else if (!Array.isArray(message)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(message)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var blocks = this.blocks, byteCount = this.byteCount, length2 = message.length, blockCount = this.blockCount, index = 0, s = this.s, i2, code3;
        while (index < length2) {
          if (this.reset) {
            this.reset = false;
            blocks[0] = this.block;
            for (i2 = 1; i2 < blockCount + 1; ++i2) {
              blocks[i2] = 0;
            }
          }
          if (notString) {
            for (i2 = this.start; index < length2 && i2 < byteCount; ++index) {
              blocks[i2 >> 2] |= message[index] << SHIFT[i2++ & 3];
            }
          } else {
            for (i2 = this.start; index < length2 && i2 < byteCount; ++index) {
              code3 = message.charCodeAt(index);
              if (code3 < 128) {
                blocks[i2 >> 2] |= code3 << SHIFT[i2++ & 3];
              } else if (code3 < 2048) {
                blocks[i2 >> 2] |= (192 | code3 >> 6) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code3 & 63) << SHIFT[i2++ & 3];
              } else if (code3 < 55296 || code3 >= 57344) {
                blocks[i2 >> 2] |= (224 | code3 >> 12) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code3 >> 6 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code3 & 63) << SHIFT[i2++ & 3];
              } else {
                code3 = 65536 + ((code3 & 1023) << 10 | message.charCodeAt(++index) & 1023);
                blocks[i2 >> 2] |= (240 | code3 >> 18) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code3 >> 12 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code3 >> 6 & 63) << SHIFT[i2++ & 3];
                blocks[i2 >> 2] |= (128 | code3 & 63) << SHIFT[i2++ & 3];
              }
            }
          }
          this.lastByteIndex = i2;
          if (i2 >= byteCount) {
            this.start = i2 - byteCount;
            this.block = blocks[blockCount];
            for (i2 = 0; i2 < blockCount; ++i2) {
              s[i2] ^= blocks[i2];
            }
            f(s);
            this.reset = true;
          } else {
            this.start = i2;
          }
        }
        return this;
      };
      Keccak.prototype.encode = function(x, right) {
        var o = x & 255, n = 1;
        var bytes = [o];
        x = x >> 8;
        o = x & 255;
        while (o > 0) {
          bytes.unshift(o);
          x = x >> 8;
          o = x & 255;
          ++n;
        }
        if (right) {
          bytes.push(n);
        } else {
          bytes.unshift(n);
        }
        this.update(bytes);
        return bytes.length;
      };
      Keccak.prototype.encodeString = function(str) {
        var notString, type = typeof str;
        if (type !== "string") {
          if (type === "object") {
            if (str === null) {
              throw new Error(INPUT_ERROR);
            } else if (ARRAY_BUFFER && str.constructor === ArrayBuffer) {
              str = new Uint8Array(str);
            } else if (!Array.isArray(str)) {
              if (!ARRAY_BUFFER || !ArrayBuffer.isView(str)) {
                throw new Error(INPUT_ERROR);
              }
            }
          } else {
            throw new Error(INPUT_ERROR);
          }
          notString = true;
        }
        var bytes = 0, length2 = str.length;
        if (notString) {
          bytes = length2;
        } else {
          for (var i2 = 0; i2 < str.length; ++i2) {
            var code3 = str.charCodeAt(i2);
            if (code3 < 128) {
              bytes += 1;
            } else if (code3 < 2048) {
              bytes += 2;
            } else if (code3 < 55296 || code3 >= 57344) {
              bytes += 3;
            } else {
              code3 = 65536 + ((code3 & 1023) << 10 | str.charCodeAt(++i2) & 1023);
              bytes += 4;
            }
          }
        }
        bytes += this.encode(bytes * 8);
        this.update(str);
        return bytes;
      };
      Keccak.prototype.bytepad = function(strs, w) {
        var bytes = this.encode(w);
        for (var i2 = 0; i2 < strs.length; ++i2) {
          bytes += this.encodeString(strs[i2]);
        }
        var paddingBytes = w - bytes % w;
        var zeros = [];
        zeros.length = paddingBytes;
        this.update(zeros);
        return this;
      };
      Keccak.prototype.finalize = function() {
        if (this.finalized) {
          return;
        }
        this.finalized = true;
        var blocks = this.blocks, i2 = this.lastByteIndex, blockCount = this.blockCount, s = this.s;
        blocks[i2 >> 2] |= this.padding[i2 & 3];
        if (this.lastByteIndex === this.byteCount) {
          blocks[0] = blocks[blockCount];
          for (i2 = 1; i2 < blockCount + 1; ++i2) {
            blocks[i2] = 0;
          }
        }
        blocks[blockCount - 1] |= 2147483648;
        for (i2 = 0; i2 < blockCount; ++i2) {
          s[i2] ^= blocks[i2];
        }
        f(s);
      };
      Keccak.prototype.toString = Keccak.prototype.hex = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var hex = "", block;
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            block = s[i2];
            hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15] + HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15] + HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15] + HEX_CHARS[block >> 28 & 15] + HEX_CHARS[block >> 24 & 15];
          }
          if (j2 % blockCount === 0) {
            f(s);
            i2 = 0;
          }
        }
        if (extraBytes) {
          block = s[i2];
          hex += HEX_CHARS[block >> 4 & 15] + HEX_CHARS[block & 15];
          if (extraBytes > 1) {
            hex += HEX_CHARS[block >> 12 & 15] + HEX_CHARS[block >> 8 & 15];
          }
          if (extraBytes > 2) {
            hex += HEX_CHARS[block >> 20 & 15] + HEX_CHARS[block >> 16 & 15];
          }
        }
        return hex;
      };
      Keccak.prototype.arrayBuffer = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var bytes = this.outputBits >> 3;
        var buffer;
        if (extraBytes) {
          buffer = new ArrayBuffer(outputBlocks + 1 << 2);
        } else {
          buffer = new ArrayBuffer(bytes);
        }
        var array = new Uint32Array(buffer);
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            array[j2] = s[i2];
          }
          if (j2 % blockCount === 0) {
            f(s);
          }
        }
        if (extraBytes) {
          array[i2] = s[i2];
          buffer = buffer.slice(0, bytes);
        }
        return buffer;
      };
      Keccak.prototype.buffer = Keccak.prototype.arrayBuffer;
      Keccak.prototype.digest = Keccak.prototype.array = function() {
        this.finalize();
        var blockCount = this.blockCount, s = this.s, outputBlocks = this.outputBlocks, extraBytes = this.extraBytes, i2 = 0, j2 = 0;
        var array = [], offset, block;
        while (j2 < outputBlocks) {
          for (i2 = 0; i2 < blockCount && j2 < outputBlocks; ++i2, ++j2) {
            offset = j2 << 2;
            block = s[i2];
            array[offset] = block & 255;
            array[offset + 1] = block >> 8 & 255;
            array[offset + 2] = block >> 16 & 255;
            array[offset + 3] = block >> 24 & 255;
          }
          if (j2 % blockCount === 0) {
            f(s);
          }
        }
        if (extraBytes) {
          offset = j2 << 2;
          block = s[i2];
          array[offset] = block & 255;
          if (extraBytes > 1) {
            array[offset + 1] = block >> 8 & 255;
          }
          if (extraBytes > 2) {
            array[offset + 2] = block >> 16 & 255;
          }
        }
        return array;
      };
      function Kmac(bits2, padding, outputBits) {
        Keccak.call(this, bits2, padding, outputBits);
      }
      Kmac.prototype = new Keccak();
      Kmac.prototype.finalize = function() {
        this.encode(this.outputBits, true);
        return Keccak.prototype.finalize.call(this);
      };
      var f = function(s) {
        var h, l, n, c0, c1, c2, c3, c4, c5, c6, c7, c8, c9, b0, b1, b2, b3, b4, b5, b6, b7, b8, b9, b10, b11, b12, b13, b14, b15, b16, b17, b18, b19, b20, b21, b22, b23, b24, b25, b26, b27, b28, b29, b30, b31, b32, b33, b34, b35, b36, b37, b38, b39, b40, b41, b42, b43, b44, b45, b46, b47, b48, b49;
        for (n = 0; n < 48; n += 2) {
          c0 = s[0] ^ s[10] ^ s[20] ^ s[30] ^ s[40];
          c1 = s[1] ^ s[11] ^ s[21] ^ s[31] ^ s[41];
          c2 = s[2] ^ s[12] ^ s[22] ^ s[32] ^ s[42];
          c3 = s[3] ^ s[13] ^ s[23] ^ s[33] ^ s[43];
          c4 = s[4] ^ s[14] ^ s[24] ^ s[34] ^ s[44];
          c5 = s[5] ^ s[15] ^ s[25] ^ s[35] ^ s[45];
          c6 = s[6] ^ s[16] ^ s[26] ^ s[36] ^ s[46];
          c7 = s[7] ^ s[17] ^ s[27] ^ s[37] ^ s[47];
          c8 = s[8] ^ s[18] ^ s[28] ^ s[38] ^ s[48];
          c9 = s[9] ^ s[19] ^ s[29] ^ s[39] ^ s[49];
          h = c8 ^ (c2 << 1 | c3 >>> 31);
          l = c9 ^ (c3 << 1 | c2 >>> 31);
          s[0] ^= h;
          s[1] ^= l;
          s[10] ^= h;
          s[11] ^= l;
          s[20] ^= h;
          s[21] ^= l;
          s[30] ^= h;
          s[31] ^= l;
          s[40] ^= h;
          s[41] ^= l;
          h = c0 ^ (c4 << 1 | c5 >>> 31);
          l = c1 ^ (c5 << 1 | c4 >>> 31);
          s[2] ^= h;
          s[3] ^= l;
          s[12] ^= h;
          s[13] ^= l;
          s[22] ^= h;
          s[23] ^= l;
          s[32] ^= h;
          s[33] ^= l;
          s[42] ^= h;
          s[43] ^= l;
          h = c2 ^ (c6 << 1 | c7 >>> 31);
          l = c3 ^ (c7 << 1 | c6 >>> 31);
          s[4] ^= h;
          s[5] ^= l;
          s[14] ^= h;
          s[15] ^= l;
          s[24] ^= h;
          s[25] ^= l;
          s[34] ^= h;
          s[35] ^= l;
          s[44] ^= h;
          s[45] ^= l;
          h = c4 ^ (c8 << 1 | c9 >>> 31);
          l = c5 ^ (c9 << 1 | c8 >>> 31);
          s[6] ^= h;
          s[7] ^= l;
          s[16] ^= h;
          s[17] ^= l;
          s[26] ^= h;
          s[27] ^= l;
          s[36] ^= h;
          s[37] ^= l;
          s[46] ^= h;
          s[47] ^= l;
          h = c6 ^ (c0 << 1 | c1 >>> 31);
          l = c7 ^ (c1 << 1 | c0 >>> 31);
          s[8] ^= h;
          s[9] ^= l;
          s[18] ^= h;
          s[19] ^= l;
          s[28] ^= h;
          s[29] ^= l;
          s[38] ^= h;
          s[39] ^= l;
          s[48] ^= h;
          s[49] ^= l;
          b0 = s[0];
          b1 = s[1];
          b32 = s[11] << 4 | s[10] >>> 28;
          b33 = s[10] << 4 | s[11] >>> 28;
          b14 = s[20] << 3 | s[21] >>> 29;
          b15 = s[21] << 3 | s[20] >>> 29;
          b46 = s[31] << 9 | s[30] >>> 23;
          b47 = s[30] << 9 | s[31] >>> 23;
          b28 = s[40] << 18 | s[41] >>> 14;
          b29 = s[41] << 18 | s[40] >>> 14;
          b20 = s[2] << 1 | s[3] >>> 31;
          b21 = s[3] << 1 | s[2] >>> 31;
          b2 = s[13] << 12 | s[12] >>> 20;
          b3 = s[12] << 12 | s[13] >>> 20;
          b34 = s[22] << 10 | s[23] >>> 22;
          b35 = s[23] << 10 | s[22] >>> 22;
          b16 = s[33] << 13 | s[32] >>> 19;
          b17 = s[32] << 13 | s[33] >>> 19;
          b48 = s[42] << 2 | s[43] >>> 30;
          b49 = s[43] << 2 | s[42] >>> 30;
          b40 = s[5] << 30 | s[4] >>> 2;
          b41 = s[4] << 30 | s[5] >>> 2;
          b22 = s[14] << 6 | s[15] >>> 26;
          b23 = s[15] << 6 | s[14] >>> 26;
          b4 = s[25] << 11 | s[24] >>> 21;
          b5 = s[24] << 11 | s[25] >>> 21;
          b36 = s[34] << 15 | s[35] >>> 17;
          b37 = s[35] << 15 | s[34] >>> 17;
          b18 = s[45] << 29 | s[44] >>> 3;
          b19 = s[44] << 29 | s[45] >>> 3;
          b10 = s[6] << 28 | s[7] >>> 4;
          b11 = s[7] << 28 | s[6] >>> 4;
          b42 = s[17] << 23 | s[16] >>> 9;
          b43 = s[16] << 23 | s[17] >>> 9;
          b24 = s[26] << 25 | s[27] >>> 7;
          b25 = s[27] << 25 | s[26] >>> 7;
          b6 = s[36] << 21 | s[37] >>> 11;
          b7 = s[37] << 21 | s[36] >>> 11;
          b38 = s[47] << 24 | s[46] >>> 8;
          b39 = s[46] << 24 | s[47] >>> 8;
          b30 = s[8] << 27 | s[9] >>> 5;
          b31 = s[9] << 27 | s[8] >>> 5;
          b12 = s[18] << 20 | s[19] >>> 12;
          b13 = s[19] << 20 | s[18] >>> 12;
          b44 = s[29] << 7 | s[28] >>> 25;
          b45 = s[28] << 7 | s[29] >>> 25;
          b26 = s[38] << 8 | s[39] >>> 24;
          b27 = s[39] << 8 | s[38] >>> 24;
          b8 = s[48] << 14 | s[49] >>> 18;
          b9 = s[49] << 14 | s[48] >>> 18;
          s[0] = b0 ^ ~b2 & b4;
          s[1] = b1 ^ ~b3 & b5;
          s[10] = b10 ^ ~b12 & b14;
          s[11] = b11 ^ ~b13 & b15;
          s[20] = b20 ^ ~b22 & b24;
          s[21] = b21 ^ ~b23 & b25;
          s[30] = b30 ^ ~b32 & b34;
          s[31] = b31 ^ ~b33 & b35;
          s[40] = b40 ^ ~b42 & b44;
          s[41] = b41 ^ ~b43 & b45;
          s[2] = b2 ^ ~b4 & b6;
          s[3] = b3 ^ ~b5 & b7;
          s[12] = b12 ^ ~b14 & b16;
          s[13] = b13 ^ ~b15 & b17;
          s[22] = b22 ^ ~b24 & b26;
          s[23] = b23 ^ ~b25 & b27;
          s[32] = b32 ^ ~b34 & b36;
          s[33] = b33 ^ ~b35 & b37;
          s[42] = b42 ^ ~b44 & b46;
          s[43] = b43 ^ ~b45 & b47;
          s[4] = b4 ^ ~b6 & b8;
          s[5] = b5 ^ ~b7 & b9;
          s[14] = b14 ^ ~b16 & b18;
          s[15] = b15 ^ ~b17 & b19;
          s[24] = b24 ^ ~b26 & b28;
          s[25] = b25 ^ ~b27 & b29;
          s[34] = b34 ^ ~b36 & b38;
          s[35] = b35 ^ ~b37 & b39;
          s[44] = b44 ^ ~b46 & b48;
          s[45] = b45 ^ ~b47 & b49;
          s[6] = b6 ^ ~b8 & b0;
          s[7] = b7 ^ ~b9 & b1;
          s[16] = b16 ^ ~b18 & b10;
          s[17] = b17 ^ ~b19 & b11;
          s[26] = b26 ^ ~b28 & b20;
          s[27] = b27 ^ ~b29 & b21;
          s[36] = b36 ^ ~b38 & b30;
          s[37] = b37 ^ ~b39 & b31;
          s[46] = b46 ^ ~b48 & b40;
          s[47] = b47 ^ ~b49 & b41;
          s[8] = b8 ^ ~b0 & b2;
          s[9] = b9 ^ ~b1 & b3;
          s[18] = b18 ^ ~b10 & b12;
          s[19] = b19 ^ ~b11 & b13;
          s[28] = b28 ^ ~b20 & b22;
          s[29] = b29 ^ ~b21 & b23;
          s[38] = b38 ^ ~b30 & b32;
          s[39] = b39 ^ ~b31 & b33;
          s[48] = b48 ^ ~b40 & b42;
          s[49] = b49 ^ ~b41 & b43;
          s[0] ^= RC[n];
          s[1] ^= RC[n + 1];
        }
      };
      if (COMMON_JS) {
        module2.exports = methods;
      } else {
        for (i = 0; i < methodNames.length; ++i) {
          root[methodNames[i]] = methods[methodNames[i]];
        }
        if (AMD) {
          define(function() {
            return methods;
          });
        }
      }
    })();
  }
});

// ../../node_modules/murmurhash3js-revisited/lib/murmurHash3js.js
var require_murmurHash3js = __commonJS({
  "../../node_modules/murmurhash3js-revisited/lib/murmurHash3js.js"(exports2, module2) {
    (function(root, undefined2) {
      "use strict";
      var library = {
        "version": "3.0.0",
        "x86": {},
        "x64": {},
        "inputValidation": true
      };
      function _validBytes(bytes) {
        if (!Array.isArray(bytes) && !ArrayBuffer.isView(bytes)) {
          return false;
        }
        for (var i = 0; i < bytes.length; i++) {
          if (!Number.isInteger(bytes[i]) || bytes[i] < 0 || bytes[i] > 255) {
            return false;
          }
        }
        return true;
      }
      function _x86Multiply(m, n) {
        return (m & 65535) * n + (((m >>> 16) * n & 65535) << 16);
      }
      function _x86Rotl(m, n) {
        return m << n | m >>> 32 - n;
      }
      function _x86Fmix(h) {
        h ^= h >>> 16;
        h = _x86Multiply(h, 2246822507);
        h ^= h >>> 13;
        h = _x86Multiply(h, 3266489909);
        h ^= h >>> 16;
        return h;
      }
      function _x64Add(m, n) {
        m = [m[0] >>> 16, m[0] & 65535, m[1] >>> 16, m[1] & 65535];
        n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
        var o = [0, 0, 0, 0];
        o[3] += m[3] + n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 65535;
        o[2] += m[2] + n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 65535;
        o[1] += m[1] + n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 65535;
        o[0] += m[0] + n[0];
        o[0] &= 65535;
        return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
      }
      function _x64Multiply(m, n) {
        m = [m[0] >>> 16, m[0] & 65535, m[1] >>> 16, m[1] & 65535];
        n = [n[0] >>> 16, n[0] & 65535, n[1] >>> 16, n[1] & 65535];
        var o = [0, 0, 0, 0];
        o[3] += m[3] * n[3];
        o[2] += o[3] >>> 16;
        o[3] &= 65535;
        o[2] += m[2] * n[3];
        o[1] += o[2] >>> 16;
        o[2] &= 65535;
        o[2] += m[3] * n[2];
        o[1] += o[2] >>> 16;
        o[2] &= 65535;
        o[1] += m[1] * n[3];
        o[0] += o[1] >>> 16;
        o[1] &= 65535;
        o[1] += m[2] * n[2];
        o[0] += o[1] >>> 16;
        o[1] &= 65535;
        o[1] += m[3] * n[1];
        o[0] += o[1] >>> 16;
        o[1] &= 65535;
        o[0] += m[0] * n[3] + m[1] * n[2] + m[2] * n[1] + m[3] * n[0];
        o[0] &= 65535;
        return [o[0] << 16 | o[1], o[2] << 16 | o[3]];
      }
      function _x64Rotl(m, n) {
        n %= 64;
        if (n === 32) {
          return [m[1], m[0]];
        } else if (n < 32) {
          return [m[0] << n | m[1] >>> 32 - n, m[1] << n | m[0] >>> 32 - n];
        } else {
          n -= 32;
          return [m[1] << n | m[0] >>> 32 - n, m[0] << n | m[1] >>> 32 - n];
        }
      }
      function _x64LeftShift(m, n) {
        n %= 64;
        if (n === 0) {
          return m;
        } else if (n < 32) {
          return [m[0] << n | m[1] >>> 32 - n, m[1] << n];
        } else {
          return [m[1] << n - 32, 0];
        }
      }
      function _x64Xor(m, n) {
        return [m[0] ^ n[0], m[1] ^ n[1]];
      }
      function _x64Fmix(h) {
        h = _x64Xor(h, [0, h[0] >>> 1]);
        h = _x64Multiply(h, [4283543511, 3981806797]);
        h = _x64Xor(h, [0, h[0] >>> 1]);
        h = _x64Multiply(h, [3301882366, 444984403]);
        h = _x64Xor(h, [0, h[0] >>> 1]);
        return h;
      }
      library.x86.hash32 = function(bytes, seed) {
        if (library.inputValidation && !_validBytes(bytes)) {
          return undefined2;
        }
        seed = seed || 0;
        var remainder = bytes.length % 4;
        var blocks = bytes.length - remainder;
        var h1 = seed;
        var k1 = 0;
        var c1 = 3432918353;
        var c2 = 461845907;
        for (var i = 0; i < blocks; i = i + 4) {
          k1 = bytes[i] | bytes[i + 1] << 8 | bytes[i + 2] << 16 | bytes[i + 3] << 24;
          k1 = _x86Multiply(k1, c1);
          k1 = _x86Rotl(k1, 15);
          k1 = _x86Multiply(k1, c2);
          h1 ^= k1;
          h1 = _x86Rotl(h1, 13);
          h1 = _x86Multiply(h1, 5) + 3864292196;
        }
        k1 = 0;
        switch (remainder) {
          case 3:
            k1 ^= bytes[i + 2] << 16;
          case 2:
            k1 ^= bytes[i + 1] << 8;
          case 1:
            k1 ^= bytes[i];
            k1 = _x86Multiply(k1, c1);
            k1 = _x86Rotl(k1, 15);
            k1 = _x86Multiply(k1, c2);
            h1 ^= k1;
        }
        h1 ^= bytes.length;
        h1 = _x86Fmix(h1);
        return h1 >>> 0;
      };
      library.x86.hash128 = function(bytes, seed) {
        if (library.inputValidation && !_validBytes(bytes)) {
          return undefined2;
        }
        seed = seed || 0;
        var remainder = bytes.length % 16;
        var blocks = bytes.length - remainder;
        var h1 = seed;
        var h2 = seed;
        var h3 = seed;
        var h4 = seed;
        var k1 = 0;
        var k2 = 0;
        var k3 = 0;
        var k4 = 0;
        var c1 = 597399067;
        var c2 = 2869860233;
        var c3 = 951274213;
        var c4 = 2716044179;
        for (var i = 0; i < blocks; i = i + 16) {
          k1 = bytes[i] | bytes[i + 1] << 8 | bytes[i + 2] << 16 | bytes[i + 3] << 24;
          k2 = bytes[i + 4] | bytes[i + 5] << 8 | bytes[i + 6] << 16 | bytes[i + 7] << 24;
          k3 = bytes[i + 8] | bytes[i + 9] << 8 | bytes[i + 10] << 16 | bytes[i + 11] << 24;
          k4 = bytes[i + 12] | bytes[i + 13] << 8 | bytes[i + 14] << 16 | bytes[i + 15] << 24;
          k1 = _x86Multiply(k1, c1);
          k1 = _x86Rotl(k1, 15);
          k1 = _x86Multiply(k1, c2);
          h1 ^= k1;
          h1 = _x86Rotl(h1, 19);
          h1 += h2;
          h1 = _x86Multiply(h1, 5) + 1444728091;
          k2 = _x86Multiply(k2, c2);
          k2 = _x86Rotl(k2, 16);
          k2 = _x86Multiply(k2, c3);
          h2 ^= k2;
          h2 = _x86Rotl(h2, 17);
          h2 += h3;
          h2 = _x86Multiply(h2, 5) + 197830471;
          k3 = _x86Multiply(k3, c3);
          k3 = _x86Rotl(k3, 17);
          k3 = _x86Multiply(k3, c4);
          h3 ^= k3;
          h3 = _x86Rotl(h3, 15);
          h3 += h4;
          h3 = _x86Multiply(h3, 5) + 2530024501;
          k4 = _x86Multiply(k4, c4);
          k4 = _x86Rotl(k4, 18);
          k4 = _x86Multiply(k4, c1);
          h4 ^= k4;
          h4 = _x86Rotl(h4, 13);
          h4 += h1;
          h4 = _x86Multiply(h4, 5) + 850148119;
        }
        k1 = 0;
        k2 = 0;
        k3 = 0;
        k4 = 0;
        switch (remainder) {
          case 15:
            k4 ^= bytes[i + 14] << 16;
          case 14:
            k4 ^= bytes[i + 13] << 8;
          case 13:
            k4 ^= bytes[i + 12];
            k4 = _x86Multiply(k4, c4);
            k4 = _x86Rotl(k4, 18);
            k4 = _x86Multiply(k4, c1);
            h4 ^= k4;
          case 12:
            k3 ^= bytes[i + 11] << 24;
          case 11:
            k3 ^= bytes[i + 10] << 16;
          case 10:
            k3 ^= bytes[i + 9] << 8;
          case 9:
            k3 ^= bytes[i + 8];
            k3 = _x86Multiply(k3, c3);
            k3 = _x86Rotl(k3, 17);
            k3 = _x86Multiply(k3, c4);
            h3 ^= k3;
          case 8:
            k2 ^= bytes[i + 7] << 24;
          case 7:
            k2 ^= bytes[i + 6] << 16;
          case 6:
            k2 ^= bytes[i + 5] << 8;
          case 5:
            k2 ^= bytes[i + 4];
            k2 = _x86Multiply(k2, c2);
            k2 = _x86Rotl(k2, 16);
            k2 = _x86Multiply(k2, c3);
            h2 ^= k2;
          case 4:
            k1 ^= bytes[i + 3] << 24;
          case 3:
            k1 ^= bytes[i + 2] << 16;
          case 2:
            k1 ^= bytes[i + 1] << 8;
          case 1:
            k1 ^= bytes[i];
            k1 = _x86Multiply(k1, c1);
            k1 = _x86Rotl(k1, 15);
            k1 = _x86Multiply(k1, c2);
            h1 ^= k1;
        }
        h1 ^= bytes.length;
        h2 ^= bytes.length;
        h3 ^= bytes.length;
        h4 ^= bytes.length;
        h1 += h2;
        h1 += h3;
        h1 += h4;
        h2 += h1;
        h3 += h1;
        h4 += h1;
        h1 = _x86Fmix(h1);
        h2 = _x86Fmix(h2);
        h3 = _x86Fmix(h3);
        h4 = _x86Fmix(h4);
        h1 += h2;
        h1 += h3;
        h1 += h4;
        h2 += h1;
        h3 += h1;
        h4 += h1;
        return ("00000000" + (h1 >>> 0).toString(16)).slice(-8) + ("00000000" + (h2 >>> 0).toString(16)).slice(-8) + ("00000000" + (h3 >>> 0).toString(16)).slice(-8) + ("00000000" + (h4 >>> 0).toString(16)).slice(-8);
      };
      library.x64.hash128 = function(bytes, seed) {
        if (library.inputValidation && !_validBytes(bytes)) {
          return undefined2;
        }
        seed = seed || 0;
        var remainder = bytes.length % 16;
        var blocks = bytes.length - remainder;
        var h1 = [0, seed];
        var h2 = [0, seed];
        var k1 = [0, 0];
        var k2 = [0, 0];
        var c1 = [2277735313, 289559509];
        var c2 = [1291169091, 658871167];
        for (var i = 0; i < blocks; i = i + 16) {
          k1 = [bytes[i + 4] | bytes[i + 5] << 8 | bytes[i + 6] << 16 | bytes[i + 7] << 24, bytes[i] | bytes[i + 1] << 8 | bytes[i + 2] << 16 | bytes[i + 3] << 24];
          k2 = [bytes[i + 12] | bytes[i + 13] << 8 | bytes[i + 14] << 16 | bytes[i + 15] << 24, bytes[i + 8] | bytes[i + 9] << 8 | bytes[i + 10] << 16 | bytes[i + 11] << 24];
          k1 = _x64Multiply(k1, c1);
          k1 = _x64Rotl(k1, 31);
          k1 = _x64Multiply(k1, c2);
          h1 = _x64Xor(h1, k1);
          h1 = _x64Rotl(h1, 27);
          h1 = _x64Add(h1, h2);
          h1 = _x64Add(_x64Multiply(h1, [0, 5]), [0, 1390208809]);
          k2 = _x64Multiply(k2, c2);
          k2 = _x64Rotl(k2, 33);
          k2 = _x64Multiply(k2, c1);
          h2 = _x64Xor(h2, k2);
          h2 = _x64Rotl(h2, 31);
          h2 = _x64Add(h2, h1);
          h2 = _x64Add(_x64Multiply(h2, [0, 5]), [0, 944331445]);
        }
        k1 = [0, 0];
        k2 = [0, 0];
        switch (remainder) {
          case 15:
            k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 14]], 48));
          case 14:
            k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 13]], 40));
          case 13:
            k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 12]], 32));
          case 12:
            k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 11]], 24));
          case 11:
            k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 10]], 16));
          case 10:
            k2 = _x64Xor(k2, _x64LeftShift([0, bytes[i + 9]], 8));
          case 9:
            k2 = _x64Xor(k2, [0, bytes[i + 8]]);
            k2 = _x64Multiply(k2, c2);
            k2 = _x64Rotl(k2, 33);
            k2 = _x64Multiply(k2, c1);
            h2 = _x64Xor(h2, k2);
          case 8:
            k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 7]], 56));
          case 7:
            k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 6]], 48));
          case 6:
            k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 5]], 40));
          case 5:
            k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 4]], 32));
          case 4:
            k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 3]], 24));
          case 3:
            k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 2]], 16));
          case 2:
            k1 = _x64Xor(k1, _x64LeftShift([0, bytes[i + 1]], 8));
          case 1:
            k1 = _x64Xor(k1, [0, bytes[i]]);
            k1 = _x64Multiply(k1, c1);
            k1 = _x64Rotl(k1, 31);
            k1 = _x64Multiply(k1, c2);
            h1 = _x64Xor(h1, k1);
        }
        h1 = _x64Xor(h1, [0, bytes.length]);
        h2 = _x64Xor(h2, [0, bytes.length]);
        h1 = _x64Add(h1, h2);
        h2 = _x64Add(h2, h1);
        h1 = _x64Fmix(h1);
        h2 = _x64Fmix(h2);
        h1 = _x64Add(h1, h2);
        h2 = _x64Add(h2, h1);
        return ("00000000" + (h1[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h1[1] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[0] >>> 0).toString(16)).slice(-8) + ("00000000" + (h2[1] >>> 0).toString(16)).slice(-8);
      };
      if (typeof exports2 !== "undefined") {
        if (typeof module2 !== "undefined" && module2.exports) {
          exports2 = module2.exports = library;
        }
        exports2.murmurHash3 = library;
      } else if (typeof define === "function" && define.amd) {
        define([], function() {
          return library;
        });
      } else {
        library._murmurHash3 = root.murmurHash3;
        library.noConflict = function() {
          root.murmurHash3 = library._murmurHash3;
          library._murmurHash3 = undefined2;
          library.noConflict = undefined2;
          return library;
        };
        root.murmurHash3 = library;
      }
    })(exports2);
  }
});

// ../../node_modules/murmurhash3js-revisited/index.js
var require_murmurhash3js_revisited = __commonJS({
  "../../node_modules/murmurhash3js-revisited/index.js"(exports2, module2) {
    module2.exports = require_murmurHash3js();
  }
});

// ../../node_modules/multihashing-async/src/sha.browser.js
var require_sha_browser = __commonJS({
  "../../node_modules/multihashing-async/src/sha.browser.js"(exports2, module2) {
    "use strict";
    var multihash = require_src3();
    var crypto2 = self.crypto || self.msCrypto;
    var digest = async (data, alg) => {
      if (typeof self === "undefined" || !crypto2) {
        throw new Error("Please use a browser with webcrypto support and ensure the code has been delivered securely via HTTPS/TLS and run within a Secure Context");
      }
      switch (alg) {
        case "sha1":
          return new Uint8Array(await crypto2.subtle.digest({ name: "SHA-1" }, data));
        case "sha2-256":
          return new Uint8Array(await crypto2.subtle.digest({ name: "SHA-256" }, data));
        case "sha2-512":
          return new Uint8Array(await crypto2.subtle.digest({ name: "SHA-512" }, data));
        case "dbl-sha2-256": {
          const d = await crypto2.subtle.digest({ name: "SHA-256" }, data);
          return new Uint8Array(await crypto2.subtle.digest({ name: "SHA-256" }, d));
        }
        default:
          throw new Error(`${alg} is not a supported algorithm`);
      }
    };
    module2.exports = {
      factory: (alg) => async (data) => {
        return digest(data, alg);
      },
      digest,
      multihashing: async (buf, alg, length2) => {
        const h = await digest(buf, alg);
        return multihash.encode(h, alg, length2);
      }
    };
  }
});

// ../../node_modules/multihashing-async/src/utils.js
var require_utils = __commonJS({
  "../../node_modules/multihashing-async/src/utils.js"(exports2, module2) {
    "use strict";
    var fromNumberTo32BitBuf = (number) => {
      const bytes = new Uint8Array(4);
      for (let i = 0; i < 4; i++) {
        bytes[i] = number & 255;
        number = number >> 8;
      }
      return bytes;
    };
    module2.exports = {
      fromNumberTo32BitBuf
    };
  }
});

// ../../node_modules/blakejs/util.js
var require_util2 = __commonJS({
  "../../node_modules/blakejs/util.js"(exports2, module2) {
    var ERROR_MSG_INPUT = "Input must be an string, Buffer or Uint8Array";
    function normalizeInput(input) {
      let ret;
      if (input instanceof Uint8Array) {
        ret = input;
      } else if (input instanceof Buffer) {
        ret = new Uint8Array(input);
      } else if (typeof input === "string") {
        ret = new Uint8Array(Buffer.from(input, "utf8"));
      } else {
        throw new Error(ERROR_MSG_INPUT);
      }
      return ret;
    }
    function toHex2(bytes) {
      return Array.prototype.map.call(bytes, function(n) {
        return (n < 16 ? "0" : "") + n.toString(16);
      }).join("");
    }
    function uint32ToHex(val) {
      return (4294967296 + val).toString(16).substring(1);
    }
    function debugPrint(label, arr, size) {
      let msg = "\n" + label + " = ";
      for (let i = 0; i < arr.length; i += 2) {
        if (size === 32) {
          msg += uint32ToHex(arr[i]).toUpperCase();
          msg += " ";
          msg += uint32ToHex(arr[i + 1]).toUpperCase();
        } else if (size === 64) {
          msg += uint32ToHex(arr[i + 1]).toUpperCase();
          msg += uint32ToHex(arr[i]).toUpperCase();
        } else
          throw new Error("Invalid size " + size);
        if (i % 6 === 4) {
          msg += "\n" + new Array(label.length + 4).join(" ");
        } else if (i < arr.length - 2) {
          msg += " ";
        }
      }
      console.log(msg);
    }
    function testSpeed(hashFn, N, M) {
      let startMs = new Date().getTime();
      const input = new Uint8Array(N);
      for (let i = 0; i < N; i++) {
        input[i] = i % 256;
      }
      const genMs = new Date().getTime();
      console.log("Generated random input in " + (genMs - startMs) + "ms");
      startMs = genMs;
      for (let i = 0; i < M; i++) {
        const hashHex = hashFn(input);
        const hashMs = new Date().getTime();
        const ms = hashMs - startMs;
        startMs = hashMs;
        console.log("Hashed in " + ms + "ms: " + hashHex.substring(0, 20) + "...");
        console.log(Math.round(N / (1 << 20) / (ms / 1e3) * 100) / 100 + " MB PER SECOND");
      }
    }
    module2.exports = {
      normalizeInput,
      toHex: toHex2,
      debugPrint,
      testSpeed
    };
  }
});

// ../../node_modules/blakejs/blake2b.js
var require_blake2b = __commonJS({
  "../../node_modules/blakejs/blake2b.js"(exports2, module2) {
    var util = require_util2();
    function ADD64AA(v2, a, b) {
      const o0 = v2[a] + v2[b];
      let o1 = v2[a + 1] + v2[b + 1];
      if (o0 >= 4294967296) {
        o1++;
      }
      v2[a] = o0;
      v2[a + 1] = o1;
    }
    function ADD64AC(v2, a, b0, b1) {
      let o0 = v2[a] + b0;
      if (b0 < 0) {
        o0 += 4294967296;
      }
      let o1 = v2[a + 1] + b1;
      if (o0 >= 4294967296) {
        o1++;
      }
      v2[a] = o0;
      v2[a + 1] = o1;
    }
    function B2B_GET32(arr, i) {
      return arr[i] ^ arr[i + 1] << 8 ^ arr[i + 2] << 16 ^ arr[i + 3] << 24;
    }
    function B2B_G(a, b, c, d, ix, iy) {
      const x0 = m[ix];
      const x1 = m[ix + 1];
      const y0 = m[iy];
      const y1 = m[iy + 1];
      ADD64AA(v, a, b);
      ADD64AC(v, a, x0, x1);
      let xor0 = v[d] ^ v[a];
      let xor1 = v[d + 1] ^ v[a + 1];
      v[d] = xor1;
      v[d + 1] = xor0;
      ADD64AA(v, c, d);
      xor0 = v[b] ^ v[c];
      xor1 = v[b + 1] ^ v[c + 1];
      v[b] = xor0 >>> 24 ^ xor1 << 8;
      v[b + 1] = xor1 >>> 24 ^ xor0 << 8;
      ADD64AA(v, a, b);
      ADD64AC(v, a, y0, y1);
      xor0 = v[d] ^ v[a];
      xor1 = v[d + 1] ^ v[a + 1];
      v[d] = xor0 >>> 16 ^ xor1 << 16;
      v[d + 1] = xor1 >>> 16 ^ xor0 << 16;
      ADD64AA(v, c, d);
      xor0 = v[b] ^ v[c];
      xor1 = v[b + 1] ^ v[c + 1];
      v[b] = xor1 >>> 31 ^ xor0 << 1;
      v[b + 1] = xor0 >>> 31 ^ xor1 << 1;
    }
    var BLAKE2B_IV32 = new Uint32Array([
      4089235720,
      1779033703,
      2227873595,
      3144134277,
      4271175723,
      1013904242,
      1595750129,
      2773480762,
      2917565137,
      1359893119,
      725511199,
      2600822924,
      4215389547,
      528734635,
      327033209,
      1541459225
    ]);
    var SIGMA8 = [
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0,
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3
    ];
    var SIGMA82 = new Uint8Array(SIGMA8.map(function(x) {
      return x * 2;
    }));
    var v = new Uint32Array(32);
    var m = new Uint32Array(32);
    function blake2bCompress(ctx, last) {
      let i = 0;
      for (i = 0; i < 16; i++) {
        v[i] = ctx.h[i];
        v[i + 16] = BLAKE2B_IV32[i];
      }
      v[24] = v[24] ^ ctx.t;
      v[25] = v[25] ^ ctx.t / 4294967296;
      if (last) {
        v[28] = ~v[28];
        v[29] = ~v[29];
      }
      for (i = 0; i < 32; i++) {
        m[i] = B2B_GET32(ctx.b, 4 * i);
      }
      for (i = 0; i < 12; i++) {
        B2B_G(0, 8, 16, 24, SIGMA82[i * 16 + 0], SIGMA82[i * 16 + 1]);
        B2B_G(2, 10, 18, 26, SIGMA82[i * 16 + 2], SIGMA82[i * 16 + 3]);
        B2B_G(4, 12, 20, 28, SIGMA82[i * 16 + 4], SIGMA82[i * 16 + 5]);
        B2B_G(6, 14, 22, 30, SIGMA82[i * 16 + 6], SIGMA82[i * 16 + 7]);
        B2B_G(0, 10, 20, 30, SIGMA82[i * 16 + 8], SIGMA82[i * 16 + 9]);
        B2B_G(2, 12, 22, 24, SIGMA82[i * 16 + 10], SIGMA82[i * 16 + 11]);
        B2B_G(4, 14, 16, 26, SIGMA82[i * 16 + 12], SIGMA82[i * 16 + 13]);
        B2B_G(6, 8, 18, 28, SIGMA82[i * 16 + 14], SIGMA82[i * 16 + 15]);
      }
      for (i = 0; i < 16; i++) {
        ctx.h[i] = ctx.h[i] ^ v[i] ^ v[i + 16];
      }
    }
    function blake2bInit(outlen, key) {
      if (outlen === 0 || outlen > 64) {
        throw new Error("Illegal output length, expected 0 < length <= 64");
      }
      if (key && key.length > 64) {
        throw new Error("Illegal key, expected Uint8Array with 0 < length <= 64");
      }
      const ctx = {
        b: new Uint8Array(128),
        h: new Uint32Array(16),
        t: 0,
        c: 0,
        outlen
      };
      for (let i = 0; i < 16; i++) {
        ctx.h[i] = BLAKE2B_IV32[i];
      }
      const keylen = key ? key.length : 0;
      ctx.h[0] ^= 16842752 ^ keylen << 8 ^ outlen;
      if (key) {
        blake2bUpdate(ctx, key);
        ctx.c = 128;
      }
      return ctx;
    }
    function blake2bUpdate(ctx, input) {
      for (let i = 0; i < input.length; i++) {
        if (ctx.c === 128) {
          ctx.t += ctx.c;
          blake2bCompress(ctx, false);
          ctx.c = 0;
        }
        ctx.b[ctx.c++] = input[i];
      }
    }
    function blake2bFinal(ctx) {
      ctx.t += ctx.c;
      while (ctx.c < 128) {
        ctx.b[ctx.c++] = 0;
      }
      blake2bCompress(ctx, true);
      const out = new Uint8Array(ctx.outlen);
      for (let i = 0; i < ctx.outlen; i++) {
        out[i] = ctx.h[i >> 2] >> 8 * (i & 3);
      }
      return out;
    }
    function blake2b(input, key, outlen) {
      outlen = outlen || 64;
      input = util.normalizeInput(input);
      const ctx = blake2bInit(outlen, key);
      blake2bUpdate(ctx, input);
      return blake2bFinal(ctx);
    }
    function blake2bHex(input, key, outlen) {
      const output = blake2b(input, key, outlen);
      return util.toHex(output);
    }
    module2.exports = {
      blake2b,
      blake2bHex,
      blake2bInit,
      blake2bUpdate,
      blake2bFinal
    };
  }
});

// ../../node_modules/blakejs/blake2s.js
var require_blake2s = __commonJS({
  "../../node_modules/blakejs/blake2s.js"(exports2, module2) {
    var util = require_util2();
    function B2S_GET32(v2, i) {
      return v2[i] ^ v2[i + 1] << 8 ^ v2[i + 2] << 16 ^ v2[i + 3] << 24;
    }
    function B2S_G(a, b, c, d, x, y) {
      v[a] = v[a] + v[b] + x;
      v[d] = ROTR32(v[d] ^ v[a], 16);
      v[c] = v[c] + v[d];
      v[b] = ROTR32(v[b] ^ v[c], 12);
      v[a] = v[a] + v[b] + y;
      v[d] = ROTR32(v[d] ^ v[a], 8);
      v[c] = v[c] + v[d];
      v[b] = ROTR32(v[b] ^ v[c], 7);
    }
    function ROTR32(x, y) {
      return x >>> y ^ x << 32 - y;
    }
    var BLAKE2S_IV = new Uint32Array([
      1779033703,
      3144134277,
      1013904242,
      2773480762,
      1359893119,
      2600822924,
      528734635,
      1541459225
    ]);
    var SIGMA = new Uint8Array([
      0,
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      14,
      10,
      4,
      8,
      9,
      15,
      13,
      6,
      1,
      12,
      0,
      2,
      11,
      7,
      5,
      3,
      11,
      8,
      12,
      0,
      5,
      2,
      15,
      13,
      10,
      14,
      3,
      6,
      7,
      1,
      9,
      4,
      7,
      9,
      3,
      1,
      13,
      12,
      11,
      14,
      2,
      6,
      5,
      10,
      4,
      0,
      15,
      8,
      9,
      0,
      5,
      7,
      2,
      4,
      10,
      15,
      14,
      1,
      11,
      12,
      6,
      8,
      3,
      13,
      2,
      12,
      6,
      10,
      0,
      11,
      8,
      3,
      4,
      13,
      7,
      5,
      15,
      14,
      1,
      9,
      12,
      5,
      1,
      15,
      14,
      13,
      4,
      10,
      0,
      7,
      6,
      3,
      9,
      2,
      8,
      11,
      13,
      11,
      7,
      14,
      12,
      1,
      3,
      9,
      5,
      0,
      15,
      4,
      8,
      6,
      2,
      10,
      6,
      15,
      14,
      9,
      11,
      3,
      0,
      8,
      12,
      2,
      13,
      7,
      1,
      4,
      10,
      5,
      10,
      2,
      8,
      4,
      7,
      6,
      1,
      5,
      15,
      11,
      9,
      14,
      3,
      12,
      13,
      0
    ]);
    var v = new Uint32Array(16);
    var m = new Uint32Array(16);
    function blake2sCompress(ctx, last) {
      let i = 0;
      for (i = 0; i < 8; i++) {
        v[i] = ctx.h[i];
        v[i + 8] = BLAKE2S_IV[i];
      }
      v[12] ^= ctx.t;
      v[13] ^= ctx.t / 4294967296;
      if (last) {
        v[14] = ~v[14];
      }
      for (i = 0; i < 16; i++) {
        m[i] = B2S_GET32(ctx.b, 4 * i);
      }
      for (i = 0; i < 10; i++) {
        B2S_G(0, 4, 8, 12, m[SIGMA[i * 16 + 0]], m[SIGMA[i * 16 + 1]]);
        B2S_G(1, 5, 9, 13, m[SIGMA[i * 16 + 2]], m[SIGMA[i * 16 + 3]]);
        B2S_G(2, 6, 10, 14, m[SIGMA[i * 16 + 4]], m[SIGMA[i * 16 + 5]]);
        B2S_G(3, 7, 11, 15, m[SIGMA[i * 16 + 6]], m[SIGMA[i * 16 + 7]]);
        B2S_G(0, 5, 10, 15, m[SIGMA[i * 16 + 8]], m[SIGMA[i * 16 + 9]]);
        B2S_G(1, 6, 11, 12, m[SIGMA[i * 16 + 10]], m[SIGMA[i * 16 + 11]]);
        B2S_G(2, 7, 8, 13, m[SIGMA[i * 16 + 12]], m[SIGMA[i * 16 + 13]]);
        B2S_G(3, 4, 9, 14, m[SIGMA[i * 16 + 14]], m[SIGMA[i * 16 + 15]]);
      }
      for (i = 0; i < 8; i++) {
        ctx.h[i] ^= v[i] ^ v[i + 8];
      }
    }
    function blake2sInit(outlen, key) {
      if (!(outlen > 0 && outlen <= 32)) {
        throw new Error("Incorrect output length, should be in [1, 32]");
      }
      const keylen = key ? key.length : 0;
      if (key && !(keylen > 0 && keylen <= 32)) {
        throw new Error("Incorrect key length, should be in [1, 32]");
      }
      const ctx = {
        h: new Uint32Array(BLAKE2S_IV),
        b: new Uint8Array(64),
        c: 0,
        t: 0,
        outlen
      };
      ctx.h[0] ^= 16842752 ^ keylen << 8 ^ outlen;
      if (keylen > 0) {
        blake2sUpdate(ctx, key);
        ctx.c = 64;
      }
      return ctx;
    }
    function blake2sUpdate(ctx, input) {
      for (let i = 0; i < input.length; i++) {
        if (ctx.c === 64) {
          ctx.t += ctx.c;
          blake2sCompress(ctx, false);
          ctx.c = 0;
        }
        ctx.b[ctx.c++] = input[i];
      }
    }
    function blake2sFinal(ctx) {
      ctx.t += ctx.c;
      while (ctx.c < 64) {
        ctx.b[ctx.c++] = 0;
      }
      blake2sCompress(ctx, true);
      const out = new Uint8Array(ctx.outlen);
      for (let i = 0; i < ctx.outlen; i++) {
        out[i] = ctx.h[i >> 2] >> 8 * (i & 3) & 255;
      }
      return out;
    }
    function blake2s(input, key, outlen) {
      outlen = outlen || 32;
      input = util.normalizeInput(input);
      const ctx = blake2sInit(outlen, key);
      blake2sUpdate(ctx, input);
      return blake2sFinal(ctx);
    }
    function blake2sHex(input, key, outlen) {
      const output = blake2s(input, key, outlen);
      return util.toHex(output);
    }
    module2.exports = {
      blake2s,
      blake2sHex,
      blake2sInit,
      blake2sUpdate,
      blake2sFinal
    };
  }
});

// ../../node_modules/blakejs/index.js
var require_blakejs = __commonJS({
  "../../node_modules/blakejs/index.js"(exports2, module2) {
    var b2b = require_blake2b();
    var b2s = require_blake2s();
    module2.exports = {
      blake2b: b2b.blake2b,
      blake2bHex: b2b.blake2bHex,
      blake2bInit: b2b.blake2bInit,
      blake2bUpdate: b2b.blake2bUpdate,
      blake2bFinal: b2b.blake2bFinal,
      blake2s: b2s.blake2s,
      blake2sHex: b2s.blake2sHex,
      blake2sInit: b2s.blake2sInit,
      blake2sUpdate: b2s.blake2sUpdate,
      blake2sFinal: b2s.blake2sFinal
    };
  }
});

// ../../node_modules/multihashing-async/src/blake.js
var require_blake = __commonJS({
  "../../node_modules/multihashing-async/src/blake.js"(exports2, module2) {
    "use strict";
    var blake = require_blakejs();
    var minB = 45569;
    var minS = 45633;
    var blake2b = {
      init: blake.blake2bInit,
      update: blake.blake2bUpdate,
      digest: blake.blake2bFinal
    };
    var blake2s = {
      init: blake.blake2sInit,
      update: blake.blake2sUpdate,
      digest: blake.blake2sFinal
    };
    var makeB2Hash = (size, hf) => async (data) => {
      const ctx = hf.init(size, null);
      hf.update(ctx, data);
      return hf.digest(ctx);
    };
    module2.exports = (table) => {
      for (let i = 0; i < 64; i++) {
        table[minB + i] = makeB2Hash(i + 1, blake2b);
      }
      for (let i = 0; i < 32; i++) {
        table[minS + i] = makeB2Hash(i + 1, blake2s);
      }
    };
  }
});

// ../../node_modules/multihashing-async/src/crypto.js
var require_crypto = __commonJS({
  "../../node_modules/multihashing-async/src/crypto.js"(exports2, module2) {
    "use strict";
    var sha3 = require_sha3();
    var mur = require_murmurhash3js_revisited();
    var { factory: sha2 } = require_sha_browser();
    var { fromNumberTo32BitBuf } = require_utils();
    var { fromString: uint8ArrayFromString } = (init_from_string(), from_string_exports);
    var hash = (algorithm) => async (data) => {
      switch (algorithm) {
        case "sha3-224":
          return new Uint8Array(sha3.sha3_224.arrayBuffer(data));
        case "sha3-256":
          return new Uint8Array(sha3.sha3_256.arrayBuffer(data));
        case "sha3-384":
          return new Uint8Array(sha3.sha3_384.arrayBuffer(data));
        case "sha3-512":
          return new Uint8Array(sha3.sha3_512.arrayBuffer(data));
        case "shake-128":
          return new Uint8Array(sha3.shake128.create(128).update(data).arrayBuffer());
        case "shake-256":
          return new Uint8Array(sha3.shake256.create(256).update(data).arrayBuffer());
        case "keccak-224":
          return new Uint8Array(sha3.keccak224.arrayBuffer(data));
        case "keccak-256":
          return new Uint8Array(sha3.keccak256.arrayBuffer(data));
        case "keccak-384":
          return new Uint8Array(sha3.keccak384.arrayBuffer(data));
        case "keccak-512":
          return new Uint8Array(sha3.keccak512.arrayBuffer(data));
        case "murmur3-128":
          return uint8ArrayFromString(mur.x64.hash128(data), "base16");
        case "murmur3-32":
          return fromNumberTo32BitBuf(mur.x86.hash32(data));
        default:
          throw new TypeError(`${algorithm} is not a supported algorithm`);
      }
    };
    var identity3 = (data) => data;
    module2.exports = {
      identity: identity3,
      sha1: sha2("sha1"),
      sha2256: sha2("sha2-256"),
      sha2512: sha2("sha2-512"),
      dblSha2256: sha2("dbl-sha2-256"),
      sha3224: hash("sha3-224"),
      sha3256: hash("sha3-256"),
      sha3384: hash("sha3-384"),
      sha3512: hash("sha3-512"),
      shake128: hash("shake-128"),
      shake256: hash("shake-256"),
      keccak224: hash("keccak-224"),
      keccak256: hash("keccak-256"),
      keccak384: hash("keccak-384"),
      keccak512: hash("keccak-512"),
      murmur3128: hash("murmur3-128"),
      murmur332: hash("murmur3-32"),
      addBlake: require_blake()
    };
  }
});

// ../../node_modules/uint8arrays/esm/src/equals.js
var equals_exports = {};
__export(equals_exports, {
  equals: () => equals3
});
function equals3(a, b) {
  if (a === b) {
    return true;
  }
  if (a.byteLength !== b.byteLength) {
    return false;
  }
  for (let i = 0; i < a.byteLength; i++) {
    if (a[i] !== b[i]) {
      return false;
    }
  }
  return true;
}
var init_equals = __esm({
  "../../node_modules/uint8arrays/esm/src/equals.js"() {
  }
});

// ../../node_modules/multihashing-async/src/index.js
var require_src4 = __commonJS({
  "../../node_modules/multihashing-async/src/index.js"(exports2, module2) {
    "use strict";
    var errcode = require_err_code();
    var multihash = require_src3();
    var crypto2 = require_crypto();
    var { equals: equals4 } = (init_equals(), equals_exports);
    async function Multihashing(bytes, alg, length2) {
      const digest = await Multihashing.digest(bytes, alg, length2);
      return multihash.encode(digest, alg, length2);
    }
    Multihashing.multihash = multihash;
    Multihashing.digest = async (bytes, alg, length2) => {
      const hash = Multihashing.createHash(alg);
      const digest = await hash(bytes);
      return length2 ? digest.slice(0, length2) : digest;
    };
    Multihashing.createHash = function(alg) {
      if (!alg) {
        const e = errcode(new Error("hash algorithm must be specified"), "ERR_HASH_ALGORITHM_NOT_SPECIFIED");
        throw e;
      }
      const code3 = multihash.coerceCode(alg);
      if (!Multihashing.functions[code3]) {
        throw errcode(new Error(`multihash function '${alg}' not yet supported`), "ERR_HASH_ALGORITHM_NOT_SUPPORTED");
      }
      return Multihashing.functions[code3];
    };
    Multihashing.functions = {
      0: crypto2.identity,
      17: crypto2.sha1,
      18: crypto2.sha2256,
      19: crypto2.sha2512,
      20: crypto2.sha3512,
      21: crypto2.sha3384,
      22: crypto2.sha3256,
      23: crypto2.sha3224,
      24: crypto2.shake128,
      25: crypto2.shake256,
      26: crypto2.keccak224,
      27: crypto2.keccak256,
      28: crypto2.keccak384,
      29: crypto2.keccak512,
      34: crypto2.murmur3128,
      35: crypto2.murmur332,
      86: crypto2.dblSha2256
    };
    crypto2.addBlake(Multihashing.functions);
    Multihashing.validate = async (bytes, hash) => {
      const newHash = await Multihashing(bytes, multihash.decode(hash).name);
      return equals4(hash, newHash);
    };
    module2.exports = Multihashing;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/options.js
var require_options = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/options.js"(exports2, module2) {
    "use strict";
    var mergeOptions = require_merge_options().bind({ ignoreUndefined: true });
    var multihashing = require_src4();
    async function hamtHashFn(buf) {
      const hash = await multihashing(buf, "murmur3-128");
      const justHash = hash.slice(2, 10);
      const length2 = justHash.length;
      const result = new Uint8Array(length2);
      for (let i = 0; i < length2; i++) {
        result[length2 - i - 1] = justHash[i];
      }
      return result;
    }
    var defaultOptions = {
      chunker: "fixed",
      strategy: "balanced",
      rawLeaves: false,
      onlyHash: false,
      reduceSingleLeafToSelf: true,
      hashAlg: "sha2-256",
      leafType: "file",
      cidVersion: 0,
      progress: () => () => {
      },
      shardSplitThreshold: 1e3,
      fileImportConcurrency: 50,
      blockWriteConcurrency: 10,
      minChunkSize: 262144,
      maxChunkSize: 262144,
      avgChunkSize: 262144,
      window: 16,
      polynomial: 17437180132763652,
      maxChildrenPerNode: 174,
      layerRepeat: 4,
      wrapWithDirectory: false,
      pin: false,
      recursive: false,
      hidden: false,
      preload: false,
      timeout: void 0,
      hamtHashFn,
      hamtHashCode: 34,
      hamtBucketBits: 8
    };
    module2.exports = function(options = {}) {
      return mergeOptions(defaultOptions, options);
    };
  }
});

// ../../node_modules/@protobufjs/aspromise/index.js
var require_aspromise = __commonJS({
  "../../node_modules/@protobufjs/aspromise/index.js"(exports2, module2) {
    "use strict";
    module2.exports = asPromise;
    function asPromise(fn, ctx) {
      var params = new Array(arguments.length - 1), offset = 0, index = 2, pending = true;
      while (index < arguments.length)
        params[offset++] = arguments[index++];
      return new Promise(function executor(resolve, reject) {
        params[offset] = function callback(err) {
          if (pending) {
            pending = false;
            if (err)
              reject(err);
            else {
              var params2 = new Array(arguments.length - 1), offset2 = 0;
              while (offset2 < params2.length)
                params2[offset2++] = arguments[offset2];
              resolve.apply(null, params2);
            }
          }
        };
        try {
          fn.apply(ctx || null, params);
        } catch (err) {
          if (pending) {
            pending = false;
            reject(err);
          }
        }
      });
    }
  }
});

// ../../node_modules/@protobufjs/base64/index.js
var require_base64 = __commonJS({
  "../../node_modules/@protobufjs/base64/index.js"(exports2) {
    "use strict";
    var base642 = exports2;
    base642.length = function length2(string2) {
      var p = string2.length;
      if (!p)
        return 0;
      var n = 0;
      while (--p % 4 > 1 && string2.charAt(p) === "=")
        ++n;
      return Math.ceil(string2.length * 3) / 4 - n;
    };
    var b64 = new Array(64);
    var s64 = new Array(123);
    for (i = 0; i < 64; )
      s64[b64[i] = i < 26 ? i + 65 : i < 52 ? i + 71 : i < 62 ? i - 4 : i - 59 | 43] = i++;
    var i;
    base642.encode = function encode5(buffer, start, end) {
      var parts = null, chunk = [];
      var i2 = 0, j = 0, t;
      while (start < end) {
        var b = buffer[start++];
        switch (j) {
          case 0:
            chunk[i2++] = b64[b >> 2];
            t = (b & 3) << 4;
            j = 1;
            break;
          case 1:
            chunk[i2++] = b64[t | b >> 4];
            t = (b & 15) << 2;
            j = 2;
            break;
          case 2:
            chunk[i2++] = b64[t | b >> 6];
            chunk[i2++] = b64[b & 63];
            j = 0;
            break;
        }
        if (i2 > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i2 = 0;
        }
      }
      if (j) {
        chunk[i2++] = b64[t];
        chunk[i2++] = 61;
        if (j === 1)
          chunk[i2++] = 61;
      }
      if (parts) {
        if (i2)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i2)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i2));
    };
    var invalidEncoding = "invalid encoding";
    base642.decode = function decode7(string2, buffer, offset) {
      var start = offset;
      var j = 0, t;
      for (var i2 = 0; i2 < string2.length; ) {
        var c = string2.charCodeAt(i2++);
        if (c === 61 && j > 1)
          break;
        if ((c = s64[c]) === void 0)
          throw Error(invalidEncoding);
        switch (j) {
          case 0:
            t = c;
            j = 1;
            break;
          case 1:
            buffer[offset++] = t << 2 | (c & 48) >> 4;
            t = c;
            j = 2;
            break;
          case 2:
            buffer[offset++] = (t & 15) << 4 | (c & 60) >> 2;
            t = c;
            j = 3;
            break;
          case 3:
            buffer[offset++] = (t & 3) << 6 | c;
            j = 0;
            break;
        }
      }
      if (j === 1)
        throw Error(invalidEncoding);
      return offset - start;
    };
    base642.test = function test(string2) {
      return /^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(string2);
    };
  }
});

// ../../node_modules/@protobufjs/eventemitter/index.js
var require_eventemitter = __commonJS({
  "../../node_modules/@protobufjs/eventemitter/index.js"(exports2, module2) {
    "use strict";
    module2.exports = EventEmitter;
    function EventEmitter() {
      this._listeners = {};
    }
    EventEmitter.prototype.on = function on(evt, fn, ctx) {
      (this._listeners[evt] || (this._listeners[evt] = [])).push({
        fn,
        ctx: ctx || this
      });
      return this;
    };
    EventEmitter.prototype.off = function off(evt, fn) {
      if (evt === void 0)
        this._listeners = {};
      else {
        if (fn === void 0)
          this._listeners[evt] = [];
        else {
          var listeners = this._listeners[evt];
          for (var i = 0; i < listeners.length; )
            if (listeners[i].fn === fn)
              listeners.splice(i, 1);
            else
              ++i;
        }
      }
      return this;
    };
    EventEmitter.prototype.emit = function emit(evt) {
      var listeners = this._listeners[evt];
      if (listeners) {
        var args = [], i = 1;
        for (; i < arguments.length; )
          args.push(arguments[i++]);
        for (i = 0; i < listeners.length; )
          listeners[i].fn.apply(listeners[i++].ctx, args);
      }
      return this;
    };
  }
});

// ../../node_modules/@protobufjs/float/index.js
var require_float = __commonJS({
  "../../node_modules/@protobufjs/float/index.js"(exports2, module2) {
    "use strict";
    module2.exports = factory(factory);
    function factory(exports3) {
      if (typeof Float32Array !== "undefined")
        (function() {
          var f32 = new Float32Array([-0]), f8b = new Uint8Array(f32.buffer), le = f8b[3] === 128;
          function writeFloat_f32_cpy(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
          }
          function writeFloat_f32_rev(val, buf, pos) {
            f32[0] = val;
            buf[pos] = f8b[3];
            buf[pos + 1] = f8b[2];
            buf[pos + 2] = f8b[1];
            buf[pos + 3] = f8b[0];
          }
          exports3.writeFloatLE = le ? writeFloat_f32_cpy : writeFloat_f32_rev;
          exports3.writeFloatBE = le ? writeFloat_f32_rev : writeFloat_f32_cpy;
          function readFloat_f32_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            return f32[0];
          }
          function readFloat_f32_rev(buf, pos) {
            f8b[3] = buf[pos];
            f8b[2] = buf[pos + 1];
            f8b[1] = buf[pos + 2];
            f8b[0] = buf[pos + 3];
            return f32[0];
          }
          exports3.readFloatLE = le ? readFloat_f32_cpy : readFloat_f32_rev;
          exports3.readFloatBE = le ? readFloat_f32_rev : readFloat_f32_cpy;
        })();
      else
        (function() {
          function writeFloat_ieee754(writeUint, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0)
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos);
            else if (isNaN(val))
              writeUint(2143289344, buf, pos);
            else if (val > 34028234663852886e22)
              writeUint((sign << 31 | 2139095040) >>> 0, buf, pos);
            else if (val < 11754943508222875e-54)
              writeUint((sign << 31 | Math.round(val / 1401298464324817e-60)) >>> 0, buf, pos);
            else {
              var exponent = Math.floor(Math.log(val) / Math.LN2), mantissa = Math.round(val * Math.pow(2, -exponent) * 8388608) & 8388607;
              writeUint((sign << 31 | exponent + 127 << 23 | mantissa) >>> 0, buf, pos);
            }
          }
          exports3.writeFloatLE = writeFloat_ieee754.bind(null, writeUintLE);
          exports3.writeFloatBE = writeFloat_ieee754.bind(null, writeUintBE);
          function readFloat_ieee754(readUint, buf, pos) {
            var uint = readUint(buf, pos), sign = (uint >> 31) * 2 + 1, exponent = uint >>> 23 & 255, mantissa = uint & 8388607;
            return exponent === 255 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 1401298464324817e-60 * mantissa : sign * Math.pow(2, exponent - 150) * (mantissa + 8388608);
          }
          exports3.readFloatLE = readFloat_ieee754.bind(null, readUintLE);
          exports3.readFloatBE = readFloat_ieee754.bind(null, readUintBE);
        })();
      if (typeof Float64Array !== "undefined")
        (function() {
          var f64 = new Float64Array([-0]), f8b = new Uint8Array(f64.buffer), le = f8b[7] === 128;
          function writeDouble_f64_cpy(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[0];
            buf[pos + 1] = f8b[1];
            buf[pos + 2] = f8b[2];
            buf[pos + 3] = f8b[3];
            buf[pos + 4] = f8b[4];
            buf[pos + 5] = f8b[5];
            buf[pos + 6] = f8b[6];
            buf[pos + 7] = f8b[7];
          }
          function writeDouble_f64_rev(val, buf, pos) {
            f64[0] = val;
            buf[pos] = f8b[7];
            buf[pos + 1] = f8b[6];
            buf[pos + 2] = f8b[5];
            buf[pos + 3] = f8b[4];
            buf[pos + 4] = f8b[3];
            buf[pos + 5] = f8b[2];
            buf[pos + 6] = f8b[1];
            buf[pos + 7] = f8b[0];
          }
          exports3.writeDoubleLE = le ? writeDouble_f64_cpy : writeDouble_f64_rev;
          exports3.writeDoubleBE = le ? writeDouble_f64_rev : writeDouble_f64_cpy;
          function readDouble_f64_cpy(buf, pos) {
            f8b[0] = buf[pos];
            f8b[1] = buf[pos + 1];
            f8b[2] = buf[pos + 2];
            f8b[3] = buf[pos + 3];
            f8b[4] = buf[pos + 4];
            f8b[5] = buf[pos + 5];
            f8b[6] = buf[pos + 6];
            f8b[7] = buf[pos + 7];
            return f64[0];
          }
          function readDouble_f64_rev(buf, pos) {
            f8b[7] = buf[pos];
            f8b[6] = buf[pos + 1];
            f8b[5] = buf[pos + 2];
            f8b[4] = buf[pos + 3];
            f8b[3] = buf[pos + 4];
            f8b[2] = buf[pos + 5];
            f8b[1] = buf[pos + 6];
            f8b[0] = buf[pos + 7];
            return f64[0];
          }
          exports3.readDoubleLE = le ? readDouble_f64_cpy : readDouble_f64_rev;
          exports3.readDoubleBE = le ? readDouble_f64_rev : readDouble_f64_cpy;
        })();
      else
        (function() {
          function writeDouble_ieee754(writeUint, off0, off1, val, buf, pos) {
            var sign = val < 0 ? 1 : 0;
            if (sign)
              val = -val;
            if (val === 0) {
              writeUint(0, buf, pos + off0);
              writeUint(1 / val > 0 ? 0 : 2147483648, buf, pos + off1);
            } else if (isNaN(val)) {
              writeUint(0, buf, pos + off0);
              writeUint(2146959360, buf, pos + off1);
            } else if (val > 17976931348623157e292) {
              writeUint(0, buf, pos + off0);
              writeUint((sign << 31 | 2146435072) >>> 0, buf, pos + off1);
            } else {
              var mantissa;
              if (val < 22250738585072014e-324) {
                mantissa = val / 5e-324;
                writeUint(mantissa >>> 0, buf, pos + off0);
                writeUint((sign << 31 | mantissa / 4294967296) >>> 0, buf, pos + off1);
              } else {
                var exponent = Math.floor(Math.log(val) / Math.LN2);
                if (exponent === 1024)
                  exponent = 1023;
                mantissa = val * Math.pow(2, -exponent);
                writeUint(mantissa * 4503599627370496 >>> 0, buf, pos + off0);
                writeUint((sign << 31 | exponent + 1023 << 20 | mantissa * 1048576 & 1048575) >>> 0, buf, pos + off1);
              }
            }
          }
          exports3.writeDoubleLE = writeDouble_ieee754.bind(null, writeUintLE, 0, 4);
          exports3.writeDoubleBE = writeDouble_ieee754.bind(null, writeUintBE, 4, 0);
          function readDouble_ieee754(readUint, off0, off1, buf, pos) {
            var lo = readUint(buf, pos + off0), hi = readUint(buf, pos + off1);
            var sign = (hi >> 31) * 2 + 1, exponent = hi >>> 20 & 2047, mantissa = 4294967296 * (hi & 1048575) + lo;
            return exponent === 2047 ? mantissa ? NaN : sign * Infinity : exponent === 0 ? sign * 5e-324 * mantissa : sign * Math.pow(2, exponent - 1075) * (mantissa + 4503599627370496);
          }
          exports3.readDoubleLE = readDouble_ieee754.bind(null, readUintLE, 0, 4);
          exports3.readDoubleBE = readDouble_ieee754.bind(null, readUintBE, 4, 0);
        })();
      return exports3;
    }
    function writeUintLE(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    function writeUintBE(val, buf, pos) {
      buf[pos] = val >>> 24;
      buf[pos + 1] = val >>> 16 & 255;
      buf[pos + 2] = val >>> 8 & 255;
      buf[pos + 3] = val & 255;
    }
    function readUintLE(buf, pos) {
      return (buf[pos] | buf[pos + 1] << 8 | buf[pos + 2] << 16 | buf[pos + 3] << 24) >>> 0;
    }
    function readUintBE(buf, pos) {
      return (buf[pos] << 24 | buf[pos + 1] << 16 | buf[pos + 2] << 8 | buf[pos + 3]) >>> 0;
    }
  }
});

// ../../node_modules/@protobufjs/inquire/index.js
var require_inquire = __commonJS({
  "../../node_modules/@protobufjs/inquire/index.js"(exports, module) {
    "use strict";
    module.exports = inquire;
    function inquire(moduleName) {
      try {
        var mod = eval("quire".replace(/^/, "re"))(moduleName);
        if (mod && (mod.length || Object.keys(mod).length))
          return mod;
      } catch (e) {
      }
      return null;
    }
  }
});

// ../../node_modules/@protobufjs/utf8/index.js
var require_utf8 = __commonJS({
  "../../node_modules/@protobufjs/utf8/index.js"(exports2) {
    "use strict";
    var utf8 = exports2;
    utf8.length = function utf8_length(string2) {
      var len = 0, c = 0;
      for (var i = 0; i < string2.length; ++i) {
        c = string2.charCodeAt(i);
        if (c < 128)
          len += 1;
        else if (c < 2048)
          len += 2;
        else if ((c & 64512) === 55296 && (string2.charCodeAt(i + 1) & 64512) === 56320) {
          ++i;
          len += 4;
        } else
          len += 3;
      }
      return len;
    };
    utf8.read = function utf8_read(buffer, start, end) {
      var len = end - start;
      if (len < 1)
        return "";
      var parts = null, chunk = [], i = 0, t;
      while (start < end) {
        t = buffer[start++];
        if (t < 128)
          chunk[i++] = t;
        else if (t > 191 && t < 224)
          chunk[i++] = (t & 31) << 6 | buffer[start++] & 63;
        else if (t > 239 && t < 365) {
          t = ((t & 7) << 18 | (buffer[start++] & 63) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63) - 65536;
          chunk[i++] = 55296 + (t >> 10);
          chunk[i++] = 56320 + (t & 1023);
        } else
          chunk[i++] = (t & 15) << 12 | (buffer[start++] & 63) << 6 | buffer[start++] & 63;
        if (i > 8191) {
          (parts || (parts = [])).push(String.fromCharCode.apply(String, chunk));
          i = 0;
        }
      }
      if (parts) {
        if (i)
          parts.push(String.fromCharCode.apply(String, chunk.slice(0, i)));
        return parts.join("");
      }
      return String.fromCharCode.apply(String, chunk.slice(0, i));
    };
    utf8.write = function utf8_write(string2, buffer, offset) {
      var start = offset, c1, c2;
      for (var i = 0; i < string2.length; ++i) {
        c1 = string2.charCodeAt(i);
        if (c1 < 128) {
          buffer[offset++] = c1;
        } else if (c1 < 2048) {
          buffer[offset++] = c1 >> 6 | 192;
          buffer[offset++] = c1 & 63 | 128;
        } else if ((c1 & 64512) === 55296 && ((c2 = string2.charCodeAt(i + 1)) & 64512) === 56320) {
          c1 = 65536 + ((c1 & 1023) << 10) + (c2 & 1023);
          ++i;
          buffer[offset++] = c1 >> 18 | 240;
          buffer[offset++] = c1 >> 12 & 63 | 128;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        } else {
          buffer[offset++] = c1 >> 12 | 224;
          buffer[offset++] = c1 >> 6 & 63 | 128;
          buffer[offset++] = c1 & 63 | 128;
        }
      }
      return offset - start;
    };
  }
});

// ../../node_modules/@protobufjs/pool/index.js
var require_pool = __commonJS({
  "../../node_modules/@protobufjs/pool/index.js"(exports2, module2) {
    "use strict";
    module2.exports = pool;
    function pool(alloc, slice, size) {
      var SIZE = size || 8192;
      var MAX = SIZE >>> 1;
      var slab = null;
      var offset = SIZE;
      return function pool_alloc(size2) {
        if (size2 < 1 || size2 > MAX)
          return alloc(size2);
        if (offset + size2 > SIZE) {
          slab = alloc(SIZE);
          offset = 0;
        }
        var buf = slice.call(slab, offset, offset += size2);
        if (offset & 7)
          offset = (offset | 7) + 1;
        return buf;
      };
    }
  }
});

// ../../node_modules/protobufjs/src/util/longbits.js
var require_longbits = __commonJS({
  "../../node_modules/protobufjs/src/util/longbits.js"(exports2, module2) {
    "use strict";
    module2.exports = LongBits;
    var util = require_minimal();
    function LongBits(lo, hi) {
      this.lo = lo >>> 0;
      this.hi = hi >>> 0;
    }
    var zero = LongBits.zero = new LongBits(0, 0);
    zero.toNumber = function() {
      return 0;
    };
    zero.zzEncode = zero.zzDecode = function() {
      return this;
    };
    zero.length = function() {
      return 1;
    };
    var zeroHash = LongBits.zeroHash = "\0\0\0\0\0\0\0\0";
    LongBits.fromNumber = function fromNumber(value) {
      if (value === 0)
        return zero;
      var sign = value < 0;
      if (sign)
        value = -value;
      var lo = value >>> 0, hi = (value - lo) / 4294967296 >>> 0;
      if (sign) {
        hi = ~hi >>> 0;
        lo = ~lo >>> 0;
        if (++lo > 4294967295) {
          lo = 0;
          if (++hi > 4294967295)
            hi = 0;
        }
      }
      return new LongBits(lo, hi);
    };
    LongBits.from = function from3(value) {
      if (typeof value === "number")
        return LongBits.fromNumber(value);
      if (util.isString(value)) {
        if (util.Long)
          value = util.Long.fromString(value);
        else
          return LongBits.fromNumber(parseInt(value, 10));
      }
      return value.low || value.high ? new LongBits(value.low >>> 0, value.high >>> 0) : zero;
    };
    LongBits.prototype.toNumber = function toNumber(unsigned) {
      if (!unsigned && this.hi >>> 31) {
        var lo = ~this.lo + 1 >>> 0, hi = ~this.hi >>> 0;
        if (!lo)
          hi = hi + 1 >>> 0;
        return -(lo + hi * 4294967296);
      }
      return this.lo + this.hi * 4294967296;
    };
    LongBits.prototype.toLong = function toLong(unsigned) {
      return util.Long ? new util.Long(this.lo | 0, this.hi | 0, Boolean(unsigned)) : { low: this.lo | 0, high: this.hi | 0, unsigned: Boolean(unsigned) };
    };
    var charCodeAt = String.prototype.charCodeAt;
    LongBits.fromHash = function fromHash(hash) {
      if (hash === zeroHash)
        return zero;
      return new LongBits((charCodeAt.call(hash, 0) | charCodeAt.call(hash, 1) << 8 | charCodeAt.call(hash, 2) << 16 | charCodeAt.call(hash, 3) << 24) >>> 0, (charCodeAt.call(hash, 4) | charCodeAt.call(hash, 5) << 8 | charCodeAt.call(hash, 6) << 16 | charCodeAt.call(hash, 7) << 24) >>> 0);
    };
    LongBits.prototype.toHash = function toHash() {
      return String.fromCharCode(this.lo & 255, this.lo >>> 8 & 255, this.lo >>> 16 & 255, this.lo >>> 24, this.hi & 255, this.hi >>> 8 & 255, this.hi >>> 16 & 255, this.hi >>> 24);
    };
    LongBits.prototype.zzEncode = function zzEncode() {
      var mask = this.hi >> 31;
      this.hi = ((this.hi << 1 | this.lo >>> 31) ^ mask) >>> 0;
      this.lo = (this.lo << 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.zzDecode = function zzDecode() {
      var mask = -(this.lo & 1);
      this.lo = ((this.lo >>> 1 | this.hi << 31) ^ mask) >>> 0;
      this.hi = (this.hi >>> 1 ^ mask) >>> 0;
      return this;
    };
    LongBits.prototype.length = function length2() {
      var part0 = this.lo, part1 = (this.lo >>> 28 | this.hi << 4) >>> 0, part2 = this.hi >>> 24;
      return part2 === 0 ? part1 === 0 ? part0 < 16384 ? part0 < 128 ? 1 : 2 : part0 < 2097152 ? 3 : 4 : part1 < 16384 ? part1 < 128 ? 5 : 6 : part1 < 2097152 ? 7 : 8 : part2 < 128 ? 9 : 10;
    };
  }
});

// ../../node_modules/protobufjs/src/util/minimal.js
var require_minimal = __commonJS({
  "../../node_modules/protobufjs/src/util/minimal.js"(exports2) {
    "use strict";
    var util = exports2;
    util.asPromise = require_aspromise();
    util.base64 = require_base64();
    util.EventEmitter = require_eventemitter();
    util.float = require_float();
    util.inquire = require_inquire();
    util.utf8 = require_utf8();
    util.pool = require_pool();
    util.LongBits = require_longbits();
    util.isNode = Boolean(typeof global !== "undefined" && global && global.process && global.process.versions && global.process.versions.node);
    util.global = util.isNode && global || typeof window !== "undefined" && window || typeof self !== "undefined" && self || exports2;
    util.emptyArray = Object.freeze ? Object.freeze([]) : [];
    util.emptyObject = Object.freeze ? Object.freeze({}) : {};
    util.isInteger = Number.isInteger || function isInteger(value) {
      return typeof value === "number" && isFinite(value) && Math.floor(value) === value;
    };
    util.isString = function isString(value) {
      return typeof value === "string" || value instanceof String;
    };
    util.isObject = function isObject(value) {
      return value && typeof value === "object";
    };
    util.isset = util.isSet = function isSet(obj, prop) {
      var value = obj[prop];
      if (value != null && obj.hasOwnProperty(prop))
        return typeof value !== "object" || (Array.isArray(value) ? value.length : Object.keys(value).length) > 0;
      return false;
    };
    util.Buffer = function() {
      try {
        var Buffer2 = util.inquire("buffer").Buffer;
        return Buffer2.prototype.utf8Write ? Buffer2 : null;
      } catch (e) {
        return null;
      }
    }();
    util._Buffer_from = null;
    util._Buffer_allocUnsafe = null;
    util.newBuffer = function newBuffer(sizeOrArray) {
      return typeof sizeOrArray === "number" ? util.Buffer ? util._Buffer_allocUnsafe(sizeOrArray) : new util.Array(sizeOrArray) : util.Buffer ? util._Buffer_from(sizeOrArray) : typeof Uint8Array === "undefined" ? sizeOrArray : new Uint8Array(sizeOrArray);
    };
    util.Array = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    util.Long = util.global.dcodeIO && util.global.dcodeIO.Long || util.global.Long || util.inquire("long");
    util.key2Re = /^true|false|0|1$/;
    util.key32Re = /^-?(?:0|[1-9][0-9]*)$/;
    util.key64Re = /^(?:[\\x00-\\xff]{8}|-?(?:0|[1-9][0-9]*))$/;
    util.longToHash = function longToHash(value) {
      return value ? util.LongBits.from(value).toHash() : util.LongBits.zeroHash;
    };
    util.longFromHash = function longFromHash(hash, unsigned) {
      var bits = util.LongBits.fromHash(hash);
      if (util.Long)
        return util.Long.fromBits(bits.lo, bits.hi, unsigned);
      return bits.toNumber(Boolean(unsigned));
    };
    function merge(dst, src2, ifNotSet) {
      for (var keys = Object.keys(src2), i = 0; i < keys.length; ++i)
        if (dst[keys[i]] === void 0 || !ifNotSet)
          dst[keys[i]] = src2[keys[i]];
      return dst;
    }
    util.merge = merge;
    util.lcFirst = function lcFirst(str) {
      return str.charAt(0).toLowerCase() + str.substring(1);
    };
    function newError(name3) {
      function CustomError(message, properties) {
        if (!(this instanceof CustomError))
          return new CustomError(message, properties);
        Object.defineProperty(this, "message", { get: function() {
          return message;
        } });
        if (Error.captureStackTrace)
          Error.captureStackTrace(this, CustomError);
        else
          Object.defineProperty(this, "stack", { value: new Error().stack || "" });
        if (properties)
          merge(this, properties);
      }
      (CustomError.prototype = Object.create(Error.prototype)).constructor = CustomError;
      Object.defineProperty(CustomError.prototype, "name", { get: function() {
        return name3;
      } });
      CustomError.prototype.toString = function toString3() {
        return this.name + ": " + this.message;
      };
      return CustomError;
    }
    util.newError = newError;
    util.ProtocolError = newError("ProtocolError");
    util.oneOfGetter = function getOneOf(fieldNames) {
      var fieldMap = {};
      for (var i = 0; i < fieldNames.length; ++i)
        fieldMap[fieldNames[i]] = 1;
      return function() {
        for (var keys = Object.keys(this), i2 = keys.length - 1; i2 > -1; --i2)
          if (fieldMap[keys[i2]] === 1 && this[keys[i2]] !== void 0 && this[keys[i2]] !== null)
            return keys[i2];
      };
    };
    util.oneOfSetter = function setOneOf(fieldNames) {
      return function(name3) {
        for (var i = 0; i < fieldNames.length; ++i)
          if (fieldNames[i] !== name3)
            delete this[fieldNames[i]];
      };
    };
    util.toJSONOptions = {
      longs: String,
      enums: String,
      bytes: String,
      json: true
    };
    util._configure = function() {
      var Buffer2 = util.Buffer;
      if (!Buffer2) {
        util._Buffer_from = util._Buffer_allocUnsafe = null;
        return;
      }
      util._Buffer_from = Buffer2.from !== Uint8Array.from && Buffer2.from || function Buffer_from(value, encoding) {
        return new Buffer2(value, encoding);
      };
      util._Buffer_allocUnsafe = Buffer2.allocUnsafe || function Buffer_allocUnsafe(size) {
        return new Buffer2(size);
      };
    };
  }
});

// ../../node_modules/protobufjs/src/writer.js
var require_writer = __commonJS({
  "../../node_modules/protobufjs/src/writer.js"(exports2, module2) {
    "use strict";
    module2.exports = Writer;
    var util = require_minimal();
    var BufferWriter;
    var LongBits = util.LongBits;
    var base642 = util.base64;
    var utf8 = util.utf8;
    function Op(fn, len, val) {
      this.fn = fn;
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    function noop() {
    }
    function State(writer) {
      this.head = writer.head;
      this.tail = writer.tail;
      this.len = writer.len;
      this.next = writer.states;
    }
    function Writer() {
      this.len = 0;
      this.head = new Op(noop, 0, 0);
      this.tail = this.head;
      this.states = null;
    }
    var create2 = function create3() {
      return util.Buffer ? function create_buffer_setup() {
        return (Writer.create = function create_buffer() {
          return new BufferWriter();
        })();
      } : function create_array() {
        return new Writer();
      };
    };
    Writer.create = create2();
    Writer.alloc = function alloc(size) {
      return new util.Array(size);
    };
    if (util.Array !== Array)
      Writer.alloc = util.pool(Writer.alloc, util.Array.prototype.subarray);
    Writer.prototype._push = function push(fn, len, val) {
      this.tail = this.tail.next = new Op(fn, len, val);
      this.len += len;
      return this;
    };
    function writeByte(val, buf, pos) {
      buf[pos] = val & 255;
    }
    function writeVarint32(val, buf, pos) {
      while (val > 127) {
        buf[pos++] = val & 127 | 128;
        val >>>= 7;
      }
      buf[pos] = val;
    }
    function VarintOp(len, val) {
      this.len = len;
      this.next = void 0;
      this.val = val;
    }
    VarintOp.prototype = Object.create(Op.prototype);
    VarintOp.prototype.fn = writeVarint32;
    Writer.prototype.uint32 = function write_uint32(value) {
      this.len += (this.tail = this.tail.next = new VarintOp((value = value >>> 0) < 128 ? 1 : value < 16384 ? 2 : value < 2097152 ? 3 : value < 268435456 ? 4 : 5, value)).len;
      return this;
    };
    Writer.prototype.int32 = function write_int32(value) {
      return value < 0 ? this._push(writeVarint64, 10, LongBits.fromNumber(value)) : this.uint32(value);
    };
    Writer.prototype.sint32 = function write_sint32(value) {
      return this.uint32((value << 1 ^ value >> 31) >>> 0);
    };
    function writeVarint64(val, buf, pos) {
      while (val.hi) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = (val.lo >>> 7 | val.hi << 25) >>> 0;
        val.hi >>>= 7;
      }
      while (val.lo > 127) {
        buf[pos++] = val.lo & 127 | 128;
        val.lo = val.lo >>> 7;
      }
      buf[pos++] = val.lo;
    }
    Writer.prototype.uint64 = function write_uint64(value) {
      var bits = LongBits.from(value);
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.int64 = Writer.prototype.uint64;
    Writer.prototype.sint64 = function write_sint64(value) {
      var bits = LongBits.from(value).zzEncode();
      return this._push(writeVarint64, bits.length(), bits);
    };
    Writer.prototype.bool = function write_bool(value) {
      return this._push(writeByte, 1, value ? 1 : 0);
    };
    function writeFixed32(val, buf, pos) {
      buf[pos] = val & 255;
      buf[pos + 1] = val >>> 8 & 255;
      buf[pos + 2] = val >>> 16 & 255;
      buf[pos + 3] = val >>> 24;
    }
    Writer.prototype.fixed32 = function write_fixed32(value) {
      return this._push(writeFixed32, 4, value >>> 0);
    };
    Writer.prototype.sfixed32 = Writer.prototype.fixed32;
    Writer.prototype.fixed64 = function write_fixed64(value) {
      var bits = LongBits.from(value);
      return this._push(writeFixed32, 4, bits.lo)._push(writeFixed32, 4, bits.hi);
    };
    Writer.prototype.sfixed64 = Writer.prototype.fixed64;
    Writer.prototype.float = function write_float(value) {
      return this._push(util.float.writeFloatLE, 4, value);
    };
    Writer.prototype.double = function write_double(value) {
      return this._push(util.float.writeDoubleLE, 8, value);
    };
    var writeBytes = util.Array.prototype.set ? function writeBytes_set(val, buf, pos) {
      buf.set(val, pos);
    } : function writeBytes_for(val, buf, pos) {
      for (var i = 0; i < val.length; ++i)
        buf[pos + i] = val[i];
    };
    Writer.prototype.bytes = function write_bytes(value) {
      var len = value.length >>> 0;
      if (!len)
        return this._push(writeByte, 1, 0);
      if (util.isString(value)) {
        var buf = Writer.alloc(len = base642.length(value));
        base642.decode(value, buf, 0);
        value = buf;
      }
      return this.uint32(len)._push(writeBytes, len, value);
    };
    Writer.prototype.string = function write_string(value) {
      var len = utf8.length(value);
      return len ? this.uint32(len)._push(utf8.write, len, value) : this._push(writeByte, 1, 0);
    };
    Writer.prototype.fork = function fork() {
      this.states = new State(this);
      this.head = this.tail = new Op(noop, 0, 0);
      this.len = 0;
      return this;
    };
    Writer.prototype.reset = function reset() {
      if (this.states) {
        this.head = this.states.head;
        this.tail = this.states.tail;
        this.len = this.states.len;
        this.states = this.states.next;
      } else {
        this.head = this.tail = new Op(noop, 0, 0);
        this.len = 0;
      }
      return this;
    };
    Writer.prototype.ldelim = function ldelim() {
      var head = this.head, tail = this.tail, len = this.len;
      this.reset().uint32(len);
      if (len) {
        this.tail.next = head.next;
        this.tail = tail;
        this.len += len;
      }
      return this;
    };
    Writer.prototype.finish = function finish() {
      var head = this.head.next, buf = this.constructor.alloc(this.len), pos = 0;
      while (head) {
        head.fn(head.val, buf, pos);
        pos += head.len;
        head = head.next;
      }
      return buf;
    };
    Writer._configure = function(BufferWriter_) {
      BufferWriter = BufferWriter_;
      Writer.create = create2();
      BufferWriter._configure();
    };
  }
});

// ../../node_modules/protobufjs/src/writer_buffer.js
var require_writer_buffer = __commonJS({
  "../../node_modules/protobufjs/src/writer_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferWriter;
    var Writer = require_writer();
    (BufferWriter.prototype = Object.create(Writer.prototype)).constructor = BufferWriter;
    var util = require_minimal();
    function BufferWriter() {
      Writer.call(this);
    }
    BufferWriter._configure = function() {
      BufferWriter.alloc = util._Buffer_allocUnsafe;
      BufferWriter.writeBytesBuffer = util.Buffer && util.Buffer.prototype instanceof Uint8Array && util.Buffer.prototype.set.name === "set" ? function writeBytesBuffer_set(val, buf, pos) {
        buf.set(val, pos);
      } : function writeBytesBuffer_copy(val, buf, pos) {
        if (val.copy)
          val.copy(buf, pos, 0, val.length);
        else
          for (var i = 0; i < val.length; )
            buf[pos++] = val[i++];
      };
    };
    BufferWriter.prototype.bytes = function write_bytes_buffer(value) {
      if (util.isString(value))
        value = util._Buffer_from(value, "base64");
      var len = value.length >>> 0;
      this.uint32(len);
      if (len)
        this._push(BufferWriter.writeBytesBuffer, len, value);
      return this;
    };
    function writeStringBuffer(val, buf, pos) {
      if (val.length < 40)
        util.utf8.write(val, buf, pos);
      else if (buf.utf8Write)
        buf.utf8Write(val, pos);
      else
        buf.write(val, pos);
    }
    BufferWriter.prototype.string = function write_string_buffer(value) {
      var len = util.Buffer.byteLength(value);
      this.uint32(len);
      if (len)
        this._push(writeStringBuffer, len, value);
      return this;
    };
    BufferWriter._configure();
  }
});

// ../../node_modules/protobufjs/src/reader.js
var require_reader = __commonJS({
  "../../node_modules/protobufjs/src/reader.js"(exports2, module2) {
    "use strict";
    module2.exports = Reader;
    var util = require_minimal();
    var BufferReader;
    var LongBits = util.LongBits;
    var utf8 = util.utf8;
    function indexOutOfRange(reader, writeLength) {
      return RangeError("index out of range: " + reader.pos + " + " + (writeLength || 1) + " > " + reader.len);
    }
    function Reader(buffer) {
      this.buf = buffer;
      this.pos = 0;
      this.len = buffer.length;
    }
    var create_array = typeof Uint8Array !== "undefined" ? function create_typed_array(buffer) {
      if (buffer instanceof Uint8Array || Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    } : function create_array2(buffer) {
      if (Array.isArray(buffer))
        return new Reader(buffer);
      throw Error("illegal buffer");
    };
    var create2 = function create3() {
      return util.Buffer ? function create_buffer_setup(buffer) {
        return (Reader.create = function create_buffer(buffer2) {
          return util.Buffer.isBuffer(buffer2) ? new BufferReader(buffer2) : create_array(buffer2);
        })(buffer);
      } : create_array;
    };
    Reader.create = create2();
    Reader.prototype._slice = util.Array.prototype.subarray || util.Array.prototype.slice;
    Reader.prototype.uint32 = function read_uint32_setup() {
      var value = 4294967295;
      return function read_uint32() {
        value = (this.buf[this.pos] & 127) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 7) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 14) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 127) << 21) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        value = (value | (this.buf[this.pos] & 15) << 28) >>> 0;
        if (this.buf[this.pos++] < 128)
          return value;
        if ((this.pos += 5) > this.len) {
          this.pos = this.len;
          throw indexOutOfRange(this, 10);
        }
        return value;
      };
    }();
    Reader.prototype.int32 = function read_int32() {
      return this.uint32() | 0;
    };
    Reader.prototype.sint32 = function read_sint32() {
      var value = this.uint32();
      return value >>> 1 ^ -(value & 1) | 0;
    };
    function readLongVarint() {
      var bits = new LongBits(0, 0);
      var i = 0;
      if (this.len - this.pos > 4) {
        for (; i < 4; ++i) {
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos] & 127) << 28) >>> 0;
        bits.hi = (bits.hi | (this.buf[this.pos] & 127) >> 4) >>> 0;
        if (this.buf[this.pos++] < 128)
          return bits;
        i = 0;
      } else {
        for (; i < 3; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.lo = (bits.lo | (this.buf[this.pos] & 127) << i * 7) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
        bits.lo = (bits.lo | (this.buf[this.pos++] & 127) << i * 7) >>> 0;
        return bits;
      }
      if (this.len - this.pos > 4) {
        for (; i < 5; ++i) {
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      } else {
        for (; i < 5; ++i) {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
          bits.hi = (bits.hi | (this.buf[this.pos] & 127) << i * 7 + 3) >>> 0;
          if (this.buf[this.pos++] < 128)
            return bits;
        }
      }
      throw Error("invalid varint encoding");
    }
    Reader.prototype.bool = function read_bool() {
      return this.uint32() !== 0;
    };
    function readFixed32_end(buf, end) {
      return (buf[end - 4] | buf[end - 3] << 8 | buf[end - 2] << 16 | buf[end - 1] << 24) >>> 0;
    }
    Reader.prototype.fixed32 = function read_fixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4);
    };
    Reader.prototype.sfixed32 = function read_sfixed32() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      return readFixed32_end(this.buf, this.pos += 4) | 0;
    };
    function readFixed64() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 8);
      return new LongBits(readFixed32_end(this.buf, this.pos += 4), readFixed32_end(this.buf, this.pos += 4));
    }
    Reader.prototype.float = function read_float() {
      if (this.pos + 4 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readFloatLE(this.buf, this.pos);
      this.pos += 4;
      return value;
    };
    Reader.prototype.double = function read_double() {
      if (this.pos + 8 > this.len)
        throw indexOutOfRange(this, 4);
      var value = util.float.readDoubleLE(this.buf, this.pos);
      this.pos += 8;
      return value;
    };
    Reader.prototype.bytes = function read_bytes() {
      var length2 = this.uint32(), start = this.pos, end = this.pos + length2;
      if (end > this.len)
        throw indexOutOfRange(this, length2);
      this.pos += length2;
      if (Array.isArray(this.buf))
        return this.buf.slice(start, end);
      return start === end ? new this.buf.constructor(0) : this._slice.call(this.buf, start, end);
    };
    Reader.prototype.string = function read_string() {
      var bytes = this.bytes();
      return utf8.read(bytes, 0, bytes.length);
    };
    Reader.prototype.skip = function skip(length2) {
      if (typeof length2 === "number") {
        if (this.pos + length2 > this.len)
          throw indexOutOfRange(this, length2);
        this.pos += length2;
      } else {
        do {
          if (this.pos >= this.len)
            throw indexOutOfRange(this);
        } while (this.buf[this.pos++] & 128);
      }
      return this;
    };
    Reader.prototype.skipType = function(wireType) {
      switch (wireType) {
        case 0:
          this.skip();
          break;
        case 1:
          this.skip(8);
          break;
        case 2:
          this.skip(this.uint32());
          break;
        case 3:
          while ((wireType = this.uint32() & 7) !== 4) {
            this.skipType(wireType);
          }
          break;
        case 5:
          this.skip(4);
          break;
        default:
          throw Error("invalid wire type " + wireType + " at offset " + this.pos);
      }
      return this;
    };
    Reader._configure = function(BufferReader_) {
      BufferReader = BufferReader_;
      Reader.create = create2();
      BufferReader._configure();
      var fn = util.Long ? "toLong" : "toNumber";
      util.merge(Reader.prototype, {
        int64: function read_int64() {
          return readLongVarint.call(this)[fn](false);
        },
        uint64: function read_uint64() {
          return readLongVarint.call(this)[fn](true);
        },
        sint64: function read_sint64() {
          return readLongVarint.call(this).zzDecode()[fn](false);
        },
        fixed64: function read_fixed64() {
          return readFixed64.call(this)[fn](true);
        },
        sfixed64: function read_sfixed64() {
          return readFixed64.call(this)[fn](false);
        }
      });
    };
  }
});

// ../../node_modules/protobufjs/src/reader_buffer.js
var require_reader_buffer = __commonJS({
  "../../node_modules/protobufjs/src/reader_buffer.js"(exports2, module2) {
    "use strict";
    module2.exports = BufferReader;
    var Reader = require_reader();
    (BufferReader.prototype = Object.create(Reader.prototype)).constructor = BufferReader;
    var util = require_minimal();
    function BufferReader(buffer) {
      Reader.call(this, buffer);
    }
    BufferReader._configure = function() {
      if (util.Buffer)
        BufferReader.prototype._slice = util.Buffer.prototype.slice;
    };
    BufferReader.prototype.string = function read_string_buffer() {
      var len = this.uint32();
      return this.buf.utf8Slice ? this.buf.utf8Slice(this.pos, this.pos = Math.min(this.pos + len, this.len)) : this.buf.toString("utf-8", this.pos, this.pos = Math.min(this.pos + len, this.len));
    };
    BufferReader._configure();
  }
});

// ../../node_modules/protobufjs/src/rpc/service.js
var require_service = __commonJS({
  "../../node_modules/protobufjs/src/rpc/service.js"(exports2, module2) {
    "use strict";
    module2.exports = Service;
    var util = require_minimal();
    (Service.prototype = Object.create(util.EventEmitter.prototype)).constructor = Service;
    function Service(rpcImpl, requestDelimited, responseDelimited) {
      if (typeof rpcImpl !== "function")
        throw TypeError("rpcImpl must be a function");
      util.EventEmitter.call(this);
      this.rpcImpl = rpcImpl;
      this.requestDelimited = Boolean(requestDelimited);
      this.responseDelimited = Boolean(responseDelimited);
    }
    Service.prototype.rpcCall = function rpcCall(method, requestCtor, responseCtor, request, callback) {
      if (!request)
        throw TypeError("request must be specified");
      var self2 = this;
      if (!callback)
        return util.asPromise(rpcCall, self2, method, requestCtor, responseCtor, request);
      if (!self2.rpcImpl) {
        setTimeout(function() {
          callback(Error("already ended"));
        }, 0);
        return void 0;
      }
      try {
        return self2.rpcImpl(method, requestCtor[self2.requestDelimited ? "encodeDelimited" : "encode"](request).finish(), function rpcCallback(err, response) {
          if (err) {
            self2.emit("error", err, method);
            return callback(err);
          }
          if (response === null) {
            self2.end(true);
            return void 0;
          }
          if (!(response instanceof responseCtor)) {
            try {
              response = responseCtor[self2.responseDelimited ? "decodeDelimited" : "decode"](response);
            } catch (err2) {
              self2.emit("error", err2, method);
              return callback(err2);
            }
          }
          self2.emit("data", response, method);
          return callback(null, response);
        });
      } catch (err) {
        self2.emit("error", err, method);
        setTimeout(function() {
          callback(err);
        }, 0);
        return void 0;
      }
    };
    Service.prototype.end = function end(endedByRPC) {
      if (this.rpcImpl) {
        if (!endedByRPC)
          this.rpcImpl(null, null, null);
        this.rpcImpl = null;
        this.emit("end").off();
      }
      return this;
    };
  }
});

// ../../node_modules/protobufjs/src/rpc.js
var require_rpc = __commonJS({
  "../../node_modules/protobufjs/src/rpc.js"(exports2) {
    "use strict";
    var rpc = exports2;
    rpc.Service = require_service();
  }
});

// ../../node_modules/protobufjs/src/roots.js
var require_roots = __commonJS({
  "../../node_modules/protobufjs/src/roots.js"(exports2, module2) {
    "use strict";
    module2.exports = {};
  }
});

// ../../node_modules/protobufjs/src/index-minimal.js
var require_index_minimal = __commonJS({
  "../../node_modules/protobufjs/src/index-minimal.js"(exports2) {
    "use strict";
    var protobuf = exports2;
    protobuf.build = "minimal";
    protobuf.Writer = require_writer();
    protobuf.BufferWriter = require_writer_buffer();
    protobuf.Reader = require_reader();
    protobuf.BufferReader = require_reader_buffer();
    protobuf.util = require_minimal();
    protobuf.rpc = require_rpc();
    protobuf.roots = require_roots();
    protobuf.configure = configure;
    function configure() {
      protobuf.util._configure();
      protobuf.Writer._configure(protobuf.BufferWriter);
      protobuf.Reader._configure(protobuf.BufferReader);
    }
    configure();
  }
});

// ../../node_modules/protobufjs/minimal.js
var require_minimal2 = __commonJS({
  "../../node_modules/protobufjs/minimal.js"(exports2, module2) {
    "use strict";
    module2.exports = require_index_minimal();
  }
});

// ../../node_modules/ipfs-unixfs-importer/node_modules/ipfs-unixfs/src/unixfs.js
var require_unixfs = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/node_modules/ipfs-unixfs/src/unixfs.js"(exports2, module2) {
    "use strict";
    var $protobuf = require_minimal2();
    var $Reader = $protobuf.Reader;
    var $Writer = $protobuf.Writer;
    var $util = $protobuf.util;
    var $root = $protobuf.roots["ipfs-unixfs"] || ($protobuf.roots["ipfs-unixfs"] = {});
    $root.Data = function() {
      function Data(p) {
        this.blocksizes = [];
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null)
              this[ks[i]] = p[ks[i]];
        }
      }
      Data.prototype.Type = 0;
      Data.prototype.Data = $util.newBuffer([]);
      Data.prototype.filesize = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Data.prototype.blocksizes = $util.emptyArray;
      Data.prototype.hashType = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Data.prototype.fanout = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      Data.prototype.mode = 0;
      Data.prototype.mtime = null;
      Data.encode = function encode5(m, w) {
        if (!w)
          w = $Writer.create();
        w.uint32(8).int32(m.Type);
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
          w.uint32(18).bytes(m.Data);
        if (m.filesize != null && Object.hasOwnProperty.call(m, "filesize"))
          w.uint32(24).uint64(m.filesize);
        if (m.blocksizes != null && m.blocksizes.length) {
          for (var i = 0; i < m.blocksizes.length; ++i)
            w.uint32(32).uint64(m.blocksizes[i]);
        }
        if (m.hashType != null && Object.hasOwnProperty.call(m, "hashType"))
          w.uint32(40).uint64(m.hashType);
        if (m.fanout != null && Object.hasOwnProperty.call(m, "fanout"))
          w.uint32(48).uint64(m.fanout);
        if (m.mode != null && Object.hasOwnProperty.call(m, "mode"))
          w.uint32(56).uint32(m.mode);
        if (m.mtime != null && Object.hasOwnProperty.call(m, "mtime"))
          $root.UnixTime.encode(m.mtime, w.uint32(66).fork()).ldelim();
        return w;
      };
      Data.decode = function decode7(r, l) {
        if (!(r instanceof $Reader))
          r = $Reader.create(r);
        var c = l === void 0 ? r.len : r.pos + l, m = new $root.Data();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.Type = r.int32();
              break;
            case 2:
              m.Data = r.bytes();
              break;
            case 3:
              m.filesize = r.uint64();
              break;
            case 4:
              if (!(m.blocksizes && m.blocksizes.length))
                m.blocksizes = [];
              if ((t & 7) === 2) {
                var c2 = r.uint32() + r.pos;
                while (r.pos < c2)
                  m.blocksizes.push(r.uint64());
              } else
                m.blocksizes.push(r.uint64());
              break;
            case 5:
              m.hashType = r.uint64();
              break;
            case 6:
              m.fanout = r.uint64();
              break;
            case 7:
              m.mode = r.uint32();
              break;
            case 8:
              m.mtime = $root.UnixTime.decode(r, r.uint32());
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        if (!m.hasOwnProperty("Type"))
          throw $util.ProtocolError("missing required 'Type'", { instance: m });
        return m;
      };
      Data.fromObject = function fromObject(d) {
        if (d instanceof $root.Data)
          return d;
        var m = new $root.Data();
        switch (d.Type) {
          case "Raw":
          case 0:
            m.Type = 0;
            break;
          case "Directory":
          case 1:
            m.Type = 1;
            break;
          case "File":
          case 2:
            m.Type = 2;
            break;
          case "Metadata":
          case 3:
            m.Type = 3;
            break;
          case "Symlink":
          case 4:
            m.Type = 4;
            break;
          case "HAMTShard":
          case 5:
            m.Type = 5;
            break;
        }
        if (d.Data != null) {
          if (typeof d.Data === "string")
            $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
          else if (d.Data.length)
            m.Data = d.Data;
        }
        if (d.filesize != null) {
          if ($util.Long)
            (m.filesize = $util.Long.fromValue(d.filesize)).unsigned = true;
          else if (typeof d.filesize === "string")
            m.filesize = parseInt(d.filesize, 10);
          else if (typeof d.filesize === "number")
            m.filesize = d.filesize;
          else if (typeof d.filesize === "object")
            m.filesize = new $util.LongBits(d.filesize.low >>> 0, d.filesize.high >>> 0).toNumber(true);
        }
        if (d.blocksizes) {
          if (!Array.isArray(d.blocksizes))
            throw TypeError(".Data.blocksizes: array expected");
          m.blocksizes = [];
          for (var i = 0; i < d.blocksizes.length; ++i) {
            if ($util.Long)
              (m.blocksizes[i] = $util.Long.fromValue(d.blocksizes[i])).unsigned = true;
            else if (typeof d.blocksizes[i] === "string")
              m.blocksizes[i] = parseInt(d.blocksizes[i], 10);
            else if (typeof d.blocksizes[i] === "number")
              m.blocksizes[i] = d.blocksizes[i];
            else if (typeof d.blocksizes[i] === "object")
              m.blocksizes[i] = new $util.LongBits(d.blocksizes[i].low >>> 0, d.blocksizes[i].high >>> 0).toNumber(true);
          }
        }
        if (d.hashType != null) {
          if ($util.Long)
            (m.hashType = $util.Long.fromValue(d.hashType)).unsigned = true;
          else if (typeof d.hashType === "string")
            m.hashType = parseInt(d.hashType, 10);
          else if (typeof d.hashType === "number")
            m.hashType = d.hashType;
          else if (typeof d.hashType === "object")
            m.hashType = new $util.LongBits(d.hashType.low >>> 0, d.hashType.high >>> 0).toNumber(true);
        }
        if (d.fanout != null) {
          if ($util.Long)
            (m.fanout = $util.Long.fromValue(d.fanout)).unsigned = true;
          else if (typeof d.fanout === "string")
            m.fanout = parseInt(d.fanout, 10);
          else if (typeof d.fanout === "number")
            m.fanout = d.fanout;
          else if (typeof d.fanout === "object")
            m.fanout = new $util.LongBits(d.fanout.low >>> 0, d.fanout.high >>> 0).toNumber(true);
        }
        if (d.mode != null) {
          m.mode = d.mode >>> 0;
        }
        if (d.mtime != null) {
          if (typeof d.mtime !== "object")
            throw TypeError(".Data.mtime: object expected");
          m.mtime = $root.UnixTime.fromObject(d.mtime);
        }
        return m;
      };
      Data.toObject = function toObject(m, o) {
        if (!o)
          o = {};
        var d = {};
        if (o.arrays || o.defaults) {
          d.blocksizes = [];
        }
        if (o.defaults) {
          d.Type = o.enums === String ? "Raw" : 0;
          if (o.bytes === String)
            d.Data = "";
          else {
            d.Data = [];
            if (o.bytes !== Array)
              d.Data = $util.newBuffer(d.Data);
          }
          if ($util.Long) {
            var n = new $util.Long(0, 0, true);
            d.filesize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
          } else
            d.filesize = o.longs === String ? "0" : 0;
          if ($util.Long) {
            var n = new $util.Long(0, 0, true);
            d.hashType = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
          } else
            d.hashType = o.longs === String ? "0" : 0;
          if ($util.Long) {
            var n = new $util.Long(0, 0, true);
            d.fanout = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
          } else
            d.fanout = o.longs === String ? "0" : 0;
          d.mode = 0;
          d.mtime = null;
        }
        if (m.Type != null && m.hasOwnProperty("Type")) {
          d.Type = o.enums === String ? $root.Data.DataType[m.Type] : m.Type;
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
          d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        if (m.filesize != null && m.hasOwnProperty("filesize")) {
          if (typeof m.filesize === "number")
            d.filesize = o.longs === String ? String(m.filesize) : m.filesize;
          else
            d.filesize = o.longs === String ? $util.Long.prototype.toString.call(m.filesize) : o.longs === Number ? new $util.LongBits(m.filesize.low >>> 0, m.filesize.high >>> 0).toNumber(true) : m.filesize;
        }
        if (m.blocksizes && m.blocksizes.length) {
          d.blocksizes = [];
          for (var j = 0; j < m.blocksizes.length; ++j) {
            if (typeof m.blocksizes[j] === "number")
              d.blocksizes[j] = o.longs === String ? String(m.blocksizes[j]) : m.blocksizes[j];
            else
              d.blocksizes[j] = o.longs === String ? $util.Long.prototype.toString.call(m.blocksizes[j]) : o.longs === Number ? new $util.LongBits(m.blocksizes[j].low >>> 0, m.blocksizes[j].high >>> 0).toNumber(true) : m.blocksizes[j];
          }
        }
        if (m.hashType != null && m.hasOwnProperty("hashType")) {
          if (typeof m.hashType === "number")
            d.hashType = o.longs === String ? String(m.hashType) : m.hashType;
          else
            d.hashType = o.longs === String ? $util.Long.prototype.toString.call(m.hashType) : o.longs === Number ? new $util.LongBits(m.hashType.low >>> 0, m.hashType.high >>> 0).toNumber(true) : m.hashType;
        }
        if (m.fanout != null && m.hasOwnProperty("fanout")) {
          if (typeof m.fanout === "number")
            d.fanout = o.longs === String ? String(m.fanout) : m.fanout;
          else
            d.fanout = o.longs === String ? $util.Long.prototype.toString.call(m.fanout) : o.longs === Number ? new $util.LongBits(m.fanout.low >>> 0, m.fanout.high >>> 0).toNumber(true) : m.fanout;
        }
        if (m.mode != null && m.hasOwnProperty("mode")) {
          d.mode = m.mode;
        }
        if (m.mtime != null && m.hasOwnProperty("mtime")) {
          d.mtime = $root.UnixTime.toObject(m.mtime, o);
        }
        return d;
      };
      Data.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      Data.DataType = function() {
        var valuesById = {}, values = Object.create(valuesById);
        values[valuesById[0] = "Raw"] = 0;
        values[valuesById[1] = "Directory"] = 1;
        values[valuesById[2] = "File"] = 2;
        values[valuesById[3] = "Metadata"] = 3;
        values[valuesById[4] = "Symlink"] = 4;
        values[valuesById[5] = "HAMTShard"] = 5;
        return values;
      }();
      return Data;
    }();
    $root.UnixTime = function() {
      function UnixTime(p) {
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null)
              this[ks[i]] = p[ks[i]];
        }
      }
      UnixTime.prototype.Seconds = $util.Long ? $util.Long.fromBits(0, 0, false) : 0;
      UnixTime.prototype.FractionalNanoseconds = 0;
      UnixTime.encode = function encode5(m, w) {
        if (!w)
          w = $Writer.create();
        w.uint32(8).int64(m.Seconds);
        if (m.FractionalNanoseconds != null && Object.hasOwnProperty.call(m, "FractionalNanoseconds"))
          w.uint32(21).fixed32(m.FractionalNanoseconds);
        return w;
      };
      UnixTime.decode = function decode7(r, l) {
        if (!(r instanceof $Reader))
          r = $Reader.create(r);
        var c = l === void 0 ? r.len : r.pos + l, m = new $root.UnixTime();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.Seconds = r.int64();
              break;
            case 2:
              m.FractionalNanoseconds = r.fixed32();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        if (!m.hasOwnProperty("Seconds"))
          throw $util.ProtocolError("missing required 'Seconds'", { instance: m });
        return m;
      };
      UnixTime.fromObject = function fromObject(d) {
        if (d instanceof $root.UnixTime)
          return d;
        var m = new $root.UnixTime();
        if (d.Seconds != null) {
          if ($util.Long)
            (m.Seconds = $util.Long.fromValue(d.Seconds)).unsigned = false;
          else if (typeof d.Seconds === "string")
            m.Seconds = parseInt(d.Seconds, 10);
          else if (typeof d.Seconds === "number")
            m.Seconds = d.Seconds;
          else if (typeof d.Seconds === "object")
            m.Seconds = new $util.LongBits(d.Seconds.low >>> 0, d.Seconds.high >>> 0).toNumber();
        }
        if (d.FractionalNanoseconds != null) {
          m.FractionalNanoseconds = d.FractionalNanoseconds >>> 0;
        }
        return m;
      };
      UnixTime.toObject = function toObject(m, o) {
        if (!o)
          o = {};
        var d = {};
        if (o.defaults) {
          if ($util.Long) {
            var n = new $util.Long(0, 0, false);
            d.Seconds = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
          } else
            d.Seconds = o.longs === String ? "0" : 0;
          d.FractionalNanoseconds = 0;
        }
        if (m.Seconds != null && m.hasOwnProperty("Seconds")) {
          if (typeof m.Seconds === "number")
            d.Seconds = o.longs === String ? String(m.Seconds) : m.Seconds;
          else
            d.Seconds = o.longs === String ? $util.Long.prototype.toString.call(m.Seconds) : o.longs === Number ? new $util.LongBits(m.Seconds.low >>> 0, m.Seconds.high >>> 0).toNumber() : m.Seconds;
        }
        if (m.FractionalNanoseconds != null && m.hasOwnProperty("FractionalNanoseconds")) {
          d.FractionalNanoseconds = m.FractionalNanoseconds;
        }
        return d;
      };
      UnixTime.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return UnixTime;
    }();
    $root.Metadata = function() {
      function Metadata(p) {
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null)
              this[ks[i]] = p[ks[i]];
        }
      }
      Metadata.prototype.MimeType = "";
      Metadata.encode = function encode5(m, w) {
        if (!w)
          w = $Writer.create();
        if (m.MimeType != null && Object.hasOwnProperty.call(m, "MimeType"))
          w.uint32(10).string(m.MimeType);
        return w;
      };
      Metadata.decode = function decode7(r, l) {
        if (!(r instanceof $Reader))
          r = $Reader.create(r);
        var c = l === void 0 ? r.len : r.pos + l, m = new $root.Metadata();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.MimeType = r.string();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      Metadata.fromObject = function fromObject(d) {
        if (d instanceof $root.Metadata)
          return d;
        var m = new $root.Metadata();
        if (d.MimeType != null) {
          m.MimeType = String(d.MimeType);
        }
        return m;
      };
      Metadata.toObject = function toObject(m, o) {
        if (!o)
          o = {};
        var d = {};
        if (o.defaults) {
          d.MimeType = "";
        }
        if (m.MimeType != null && m.hasOwnProperty("MimeType")) {
          d.MimeType = m.MimeType;
        }
        return d;
      };
      Metadata.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return Metadata;
    }();
    module2.exports = $root;
  }
});

// ../../node_modules/ipfs-unixfs-importer/node_modules/ipfs-unixfs/src/index.js
var require_src5 = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/node_modules/ipfs-unixfs/src/index.js"(exports2, module2) {
    "use strict";
    var {
      Data: PBData
    } = require_unixfs();
    var errcode = require_err_code();
    var types = [
      "raw",
      "directory",
      "file",
      "metadata",
      "symlink",
      "hamt-sharded-directory"
    ];
    var dirTypes = [
      "directory",
      "hamt-sharded-directory"
    ];
    var DEFAULT_FILE_MODE = parseInt("0644", 8);
    var DEFAULT_DIRECTORY_MODE = parseInt("0755", 8);
    function parseMode(mode) {
      if (mode == null) {
        return void 0;
      }
      if (typeof mode === "number") {
        return mode & 4095;
      }
      mode = mode.toString();
      if (mode.substring(0, 1) === "0") {
        return parseInt(mode, 8) & 4095;
      }
      return parseInt(mode, 10) & 4095;
    }
    function parseMtime(input) {
      if (input == null) {
        return void 0;
      }
      let mtime;
      if (input.secs != null) {
        mtime = {
          secs: input.secs,
          nsecs: input.nsecs
        };
      }
      if (input.Seconds != null) {
        mtime = {
          secs: input.Seconds,
          nsecs: input.FractionalNanoseconds
        };
      }
      if (Array.isArray(input)) {
        mtime = {
          secs: input[0],
          nsecs: input[1]
        };
      }
      if (input instanceof Date) {
        const ms = input.getTime();
        const secs = Math.floor(ms / 1e3);
        mtime = {
          secs,
          nsecs: (ms - secs * 1e3) * 1e3
        };
      }
      if (!Object.prototype.hasOwnProperty.call(mtime, "secs")) {
        return void 0;
      }
      if (mtime != null && mtime.nsecs != null && (mtime.nsecs < 0 || mtime.nsecs > 999999999)) {
        throw errcode(new Error("mtime-nsecs must be within the range [0,999999999]"), "ERR_INVALID_MTIME_NSECS");
      }
      return mtime;
    }
    var Data = class {
      static unmarshal(marshaled) {
        const message = PBData.decode(marshaled);
        const decoded = PBData.toObject(message, {
          defaults: false,
          arrays: true,
          longs: Number,
          objects: false
        });
        const data = new Data({
          type: types[decoded.Type],
          data: decoded.Data,
          blockSizes: decoded.blocksizes,
          mode: decoded.mode,
          mtime: decoded.mtime ? {
            secs: decoded.mtime.Seconds,
            nsecs: decoded.mtime.FractionalNanoseconds
          } : void 0
        });
        data._originalMode = decoded.mode || 0;
        return data;
      }
      constructor(options = {
        type: "file"
      }) {
        const {
          type,
          data,
          blockSizes,
          hashType,
          fanout,
          mtime,
          mode
        } = options;
        if (type && !types.includes(type)) {
          throw errcode(new Error("Type: " + type + " is not valid"), "ERR_INVALID_TYPE");
        }
        this.type = type || "file";
        this.data = data;
        this.hashType = hashType;
        this.fanout = fanout;
        this.blockSizes = blockSizes || [];
        this._originalMode = 0;
        this.mode = parseMode(mode);
        if (mtime) {
          this.mtime = parseMtime(mtime);
          if (this.mtime && !this.mtime.nsecs) {
            this.mtime.nsecs = 0;
          }
        }
      }
      set mode(mode) {
        this._mode = this.isDirectory() ? DEFAULT_DIRECTORY_MODE : DEFAULT_FILE_MODE;
        const parsedMode = parseMode(mode);
        if (parsedMode !== void 0) {
          this._mode = parsedMode;
        }
      }
      get mode() {
        return this._mode;
      }
      isDirectory() {
        return Boolean(this.type && dirTypes.includes(this.type));
      }
      addBlockSize(size) {
        this.blockSizes.push(size);
      }
      removeBlockSize(index) {
        this.blockSizes.splice(index, 1);
      }
      fileSize() {
        if (this.isDirectory()) {
          return 0;
        }
        let sum = 0;
        this.blockSizes.forEach((size) => {
          sum += size;
        });
        if (this.data) {
          sum += this.data.length;
        }
        return sum;
      }
      marshal() {
        let type;
        switch (this.type) {
          case "raw":
            type = PBData.DataType.Raw;
            break;
          case "directory":
            type = PBData.DataType.Directory;
            break;
          case "file":
            type = PBData.DataType.File;
            break;
          case "metadata":
            type = PBData.DataType.Metadata;
            break;
          case "symlink":
            type = PBData.DataType.Symlink;
            break;
          case "hamt-sharded-directory":
            type = PBData.DataType.HAMTShard;
            break;
          default:
            throw errcode(new Error("Type: " + type + " is not valid"), "ERR_INVALID_TYPE");
        }
        let data = this.data;
        if (!this.data || !this.data.length) {
          data = void 0;
        }
        let mode;
        if (this.mode != null) {
          mode = this._originalMode & 4294963200 | (parseMode(this.mode) || 0);
          if (mode === DEFAULT_FILE_MODE && !this.isDirectory()) {
            mode = void 0;
          }
          if (mode === DEFAULT_DIRECTORY_MODE && this.isDirectory()) {
            mode = void 0;
          }
        }
        let mtime;
        if (this.mtime != null) {
          const parsed = parseMtime(this.mtime);
          if (parsed) {
            mtime = {
              Seconds: parsed.secs,
              FractionalNanoseconds: parsed.nsecs
            };
            if (mtime.FractionalNanoseconds === 0) {
              delete mtime.FractionalNanoseconds;
            }
          }
        }
        const pbData = {
          Type: type,
          Data: data,
          filesize: this.isDirectory() ? void 0 : this.fileSize(),
          blocksizes: this.blockSizes,
          hashType: this.hashType,
          fanout: this.fanout,
          mode,
          mtime
        };
        return PBData.encode(pbData).finish();
      }
    };
    module2.exports = {
      UnixFS: Data,
      parseMode,
      parseMtime
    };
  }
});

// ../../node_modules/varint/encode.js
var require_encode2 = __commonJS({
  "../../node_modules/varint/encode.js"(exports2, module2) {
    module2.exports = encode5;
    var MSB2 = 128;
    var REST2 = 127;
    var MSBALL2 = ~REST2;
    var INT2 = Math.pow(2, 31);
    function encode5(num, out, offset) {
      if (Number.MAX_SAFE_INTEGER && num > Number.MAX_SAFE_INTEGER) {
        encode5.bytes = 0;
        throw new RangeError("Could not encode varint");
      }
      out = out || [];
      offset = offset || 0;
      var oldOffset = offset;
      while (num >= INT2) {
        out[offset++] = num & 255 | MSB2;
        num /= 128;
      }
      while (num & MSBALL2) {
        out[offset++] = num & 255 | MSB2;
        num >>>= 7;
      }
      out[offset] = num | 0;
      encode5.bytes = offset - oldOffset + 1;
      return out;
    }
  }
});

// ../../node_modules/varint/decode.js
var require_decode2 = __commonJS({
  "../../node_modules/varint/decode.js"(exports2, module2) {
    module2.exports = read2;
    var MSB2 = 128;
    var REST2 = 127;
    function read2(buf, offset) {
      var res = 0, offset = offset || 0, shift = 0, counter = offset, b, l = buf.length;
      do {
        if (counter >= l || shift > 49) {
          read2.bytes = 0;
          throw new RangeError("Could not decode varint");
        }
        b = buf[counter++];
        res += shift < 28 ? (b & REST2) << shift : (b & REST2) * Math.pow(2, shift);
        shift += 7;
      } while (b >= MSB2);
      read2.bytes = counter - offset;
      return res;
    }
  }
});

// ../../node_modules/varint/length.js
var require_length2 = __commonJS({
  "../../node_modules/varint/length.js"(exports2, module2) {
    var N12 = Math.pow(2, 7);
    var N22 = Math.pow(2, 14);
    var N32 = Math.pow(2, 21);
    var N42 = Math.pow(2, 28);
    var N52 = Math.pow(2, 35);
    var N62 = Math.pow(2, 42);
    var N72 = Math.pow(2, 49);
    var N82 = Math.pow(2, 56);
    var N92 = Math.pow(2, 63);
    module2.exports = function(value) {
      return value < N12 ? 1 : value < N22 ? 2 : value < N32 ? 3 : value < N42 ? 4 : value < N52 ? 5 : value < N62 ? 6 : value < N72 ? 7 : value < N82 ? 8 : value < N92 ? 9 : 10;
    };
  }
});

// ../../node_modules/varint/index.js
var require_varint2 = __commonJS({
  "../../node_modules/varint/index.js"(exports2, module2) {
    module2.exports = {
      encode: require_encode2(),
      decode: require_decode2(),
      encodingLength: require_length2()
    };
  }
});

// ../../node_modules/multicodec/src/util.js
var require_util3 = __commonJS({
  "../../node_modules/multicodec/src/util.js"(exports2, module2) {
    "use strict";
    var varint4 = require_varint2();
    var { toString: uint8ArrayToString } = (init_to_string(), to_string_exports);
    var { fromString: uint8ArrayFromString } = (init_from_string(), from_string_exports);
    module2.exports = {
      numberToUint8Array,
      uint8ArrayToNumber,
      varintUint8ArrayEncode,
      varintEncode
    };
    function uint8ArrayToNumber(buf) {
      return parseInt(uint8ArrayToString(buf, "base16"), 16);
    }
    function numberToUint8Array(num) {
      let hexString = num.toString(16);
      if (hexString.length % 2 === 1) {
        hexString = "0" + hexString;
      }
      return uint8ArrayFromString(hexString, "base16");
    }
    function varintUint8ArrayEncode(input) {
      return Uint8Array.from(varint4.encode(uint8ArrayToNumber(input)));
    }
    function varintEncode(num) {
      return Uint8Array.from(varint4.encode(num));
    }
  }
});

// ../../node_modules/multicodec/src/generated-table.js
var require_generated_table = __commonJS({
  "../../node_modules/multicodec/src/generated-table.js"(exports2, module2) {
    "use strict";
    var baseTable = Object.freeze({
      "identity": 0,
      "cidv1": 1,
      "cidv2": 2,
      "cidv3": 3,
      "ip4": 4,
      "tcp": 6,
      "sha1": 17,
      "sha2-256": 18,
      "sha2-512": 19,
      "sha3-512": 20,
      "sha3-384": 21,
      "sha3-256": 22,
      "sha3-224": 23,
      "shake-128": 24,
      "shake-256": 25,
      "keccak-224": 26,
      "keccak-256": 27,
      "keccak-384": 28,
      "keccak-512": 29,
      "blake3": 30,
      "dccp": 33,
      "murmur3-128": 34,
      "murmur3-32": 35,
      "ip6": 41,
      "ip6zone": 42,
      "path": 47,
      "multicodec": 48,
      "multihash": 49,
      "multiaddr": 50,
      "multibase": 51,
      "dns": 53,
      "dns4": 54,
      "dns6": 55,
      "dnsaddr": 56,
      "protobuf": 80,
      "cbor": 81,
      "raw": 85,
      "dbl-sha2-256": 86,
      "rlp": 96,
      "bencode": 99,
      "dag-pb": 112,
      "dag-cbor": 113,
      "libp2p-key": 114,
      "git-raw": 120,
      "torrent-info": 123,
      "torrent-file": 124,
      "leofcoin-block": 129,
      "leofcoin-tx": 130,
      "leofcoin-pr": 131,
      "sctp": 132,
      "dag-jose": 133,
      "dag-cose": 134,
      "eth-block": 144,
      "eth-block-list": 145,
      "eth-tx-trie": 146,
      "eth-tx": 147,
      "eth-tx-receipt-trie": 148,
      "eth-tx-receipt": 149,
      "eth-state-trie": 150,
      "eth-account-snapshot": 151,
      "eth-storage-trie": 152,
      "eth-receipt-log-trie": 153,
      "eth-reciept-log": 154,
      "bitcoin-block": 176,
      "bitcoin-tx": 177,
      "bitcoin-witness-commitment": 178,
      "zcash-block": 192,
      "zcash-tx": 193,
      "caip-50": 202,
      "streamid": 206,
      "stellar-block": 208,
      "stellar-tx": 209,
      "md4": 212,
      "md5": 213,
      "bmt": 214,
      "decred-block": 224,
      "decred-tx": 225,
      "ipld-ns": 226,
      "ipfs-ns": 227,
      "swarm-ns": 228,
      "ipns-ns": 229,
      "zeronet": 230,
      "secp256k1-pub": 231,
      "bls12_381-g1-pub": 234,
      "bls12_381-g2-pub": 235,
      "x25519-pub": 236,
      "ed25519-pub": 237,
      "bls12_381-g1g2-pub": 238,
      "dash-block": 240,
      "dash-tx": 241,
      "swarm-manifest": 250,
      "swarm-feed": 251,
      "udp": 273,
      "p2p-webrtc-star": 275,
      "p2p-webrtc-direct": 276,
      "p2p-stardust": 277,
      "p2p-circuit": 290,
      "dag-json": 297,
      "udt": 301,
      "utp": 302,
      "unix": 400,
      "thread": 406,
      "p2p": 421,
      "ipfs": 421,
      "https": 443,
      "onion": 444,
      "onion3": 445,
      "garlic64": 446,
      "garlic32": 447,
      "tls": 448,
      "noise": 454,
      "quic": 460,
      "ws": 477,
      "wss": 478,
      "p2p-websocket-star": 479,
      "http": 480,
      "swhid-1-snp": 496,
      "json": 512,
      "messagepack": 513,
      "libp2p-peer-record": 769,
      "libp2p-relay-rsvp": 770,
      "car-index-sorted": 1024,
      "sha2-256-trunc254-padded": 4114,
      "ripemd-128": 4178,
      "ripemd-160": 4179,
      "ripemd-256": 4180,
      "ripemd-320": 4181,
      "x11": 4352,
      "p256-pub": 4608,
      "p384-pub": 4609,
      "p521-pub": 4610,
      "ed448-pub": 4611,
      "x448-pub": 4612,
      "ed25519-priv": 4864,
      "secp256k1-priv": 4865,
      "x25519-priv": 4866,
      "kangarootwelve": 7425,
      "sm3-256": 21325,
      "blake2b-8": 45569,
      "blake2b-16": 45570,
      "blake2b-24": 45571,
      "blake2b-32": 45572,
      "blake2b-40": 45573,
      "blake2b-48": 45574,
      "blake2b-56": 45575,
      "blake2b-64": 45576,
      "blake2b-72": 45577,
      "blake2b-80": 45578,
      "blake2b-88": 45579,
      "blake2b-96": 45580,
      "blake2b-104": 45581,
      "blake2b-112": 45582,
      "blake2b-120": 45583,
      "blake2b-128": 45584,
      "blake2b-136": 45585,
      "blake2b-144": 45586,
      "blake2b-152": 45587,
      "blake2b-160": 45588,
      "blake2b-168": 45589,
      "blake2b-176": 45590,
      "blake2b-184": 45591,
      "blake2b-192": 45592,
      "blake2b-200": 45593,
      "blake2b-208": 45594,
      "blake2b-216": 45595,
      "blake2b-224": 45596,
      "blake2b-232": 45597,
      "blake2b-240": 45598,
      "blake2b-248": 45599,
      "blake2b-256": 45600,
      "blake2b-264": 45601,
      "blake2b-272": 45602,
      "blake2b-280": 45603,
      "blake2b-288": 45604,
      "blake2b-296": 45605,
      "blake2b-304": 45606,
      "blake2b-312": 45607,
      "blake2b-320": 45608,
      "blake2b-328": 45609,
      "blake2b-336": 45610,
      "blake2b-344": 45611,
      "blake2b-352": 45612,
      "blake2b-360": 45613,
      "blake2b-368": 45614,
      "blake2b-376": 45615,
      "blake2b-384": 45616,
      "blake2b-392": 45617,
      "blake2b-400": 45618,
      "blake2b-408": 45619,
      "blake2b-416": 45620,
      "blake2b-424": 45621,
      "blake2b-432": 45622,
      "blake2b-440": 45623,
      "blake2b-448": 45624,
      "blake2b-456": 45625,
      "blake2b-464": 45626,
      "blake2b-472": 45627,
      "blake2b-480": 45628,
      "blake2b-488": 45629,
      "blake2b-496": 45630,
      "blake2b-504": 45631,
      "blake2b-512": 45632,
      "blake2s-8": 45633,
      "blake2s-16": 45634,
      "blake2s-24": 45635,
      "blake2s-32": 45636,
      "blake2s-40": 45637,
      "blake2s-48": 45638,
      "blake2s-56": 45639,
      "blake2s-64": 45640,
      "blake2s-72": 45641,
      "blake2s-80": 45642,
      "blake2s-88": 45643,
      "blake2s-96": 45644,
      "blake2s-104": 45645,
      "blake2s-112": 45646,
      "blake2s-120": 45647,
      "blake2s-128": 45648,
      "blake2s-136": 45649,
      "blake2s-144": 45650,
      "blake2s-152": 45651,
      "blake2s-160": 45652,
      "blake2s-168": 45653,
      "blake2s-176": 45654,
      "blake2s-184": 45655,
      "blake2s-192": 45656,
      "blake2s-200": 45657,
      "blake2s-208": 45658,
      "blake2s-216": 45659,
      "blake2s-224": 45660,
      "blake2s-232": 45661,
      "blake2s-240": 45662,
      "blake2s-248": 45663,
      "blake2s-256": 45664,
      "skein256-8": 45825,
      "skein256-16": 45826,
      "skein256-24": 45827,
      "skein256-32": 45828,
      "skein256-40": 45829,
      "skein256-48": 45830,
      "skein256-56": 45831,
      "skein256-64": 45832,
      "skein256-72": 45833,
      "skein256-80": 45834,
      "skein256-88": 45835,
      "skein256-96": 45836,
      "skein256-104": 45837,
      "skein256-112": 45838,
      "skein256-120": 45839,
      "skein256-128": 45840,
      "skein256-136": 45841,
      "skein256-144": 45842,
      "skein256-152": 45843,
      "skein256-160": 45844,
      "skein256-168": 45845,
      "skein256-176": 45846,
      "skein256-184": 45847,
      "skein256-192": 45848,
      "skein256-200": 45849,
      "skein256-208": 45850,
      "skein256-216": 45851,
      "skein256-224": 45852,
      "skein256-232": 45853,
      "skein256-240": 45854,
      "skein256-248": 45855,
      "skein256-256": 45856,
      "skein512-8": 45857,
      "skein512-16": 45858,
      "skein512-24": 45859,
      "skein512-32": 45860,
      "skein512-40": 45861,
      "skein512-48": 45862,
      "skein512-56": 45863,
      "skein512-64": 45864,
      "skein512-72": 45865,
      "skein512-80": 45866,
      "skein512-88": 45867,
      "skein512-96": 45868,
      "skein512-104": 45869,
      "skein512-112": 45870,
      "skein512-120": 45871,
      "skein512-128": 45872,
      "skein512-136": 45873,
      "skein512-144": 45874,
      "skein512-152": 45875,
      "skein512-160": 45876,
      "skein512-168": 45877,
      "skein512-176": 45878,
      "skein512-184": 45879,
      "skein512-192": 45880,
      "skein512-200": 45881,
      "skein512-208": 45882,
      "skein512-216": 45883,
      "skein512-224": 45884,
      "skein512-232": 45885,
      "skein512-240": 45886,
      "skein512-248": 45887,
      "skein512-256": 45888,
      "skein512-264": 45889,
      "skein512-272": 45890,
      "skein512-280": 45891,
      "skein512-288": 45892,
      "skein512-296": 45893,
      "skein512-304": 45894,
      "skein512-312": 45895,
      "skein512-320": 45896,
      "skein512-328": 45897,
      "skein512-336": 45898,
      "skein512-344": 45899,
      "skein512-352": 45900,
      "skein512-360": 45901,
      "skein512-368": 45902,
      "skein512-376": 45903,
      "skein512-384": 45904,
      "skein512-392": 45905,
      "skein512-400": 45906,
      "skein512-408": 45907,
      "skein512-416": 45908,
      "skein512-424": 45909,
      "skein512-432": 45910,
      "skein512-440": 45911,
      "skein512-448": 45912,
      "skein512-456": 45913,
      "skein512-464": 45914,
      "skein512-472": 45915,
      "skein512-480": 45916,
      "skein512-488": 45917,
      "skein512-496": 45918,
      "skein512-504": 45919,
      "skein512-512": 45920,
      "skein1024-8": 45921,
      "skein1024-16": 45922,
      "skein1024-24": 45923,
      "skein1024-32": 45924,
      "skein1024-40": 45925,
      "skein1024-48": 45926,
      "skein1024-56": 45927,
      "skein1024-64": 45928,
      "skein1024-72": 45929,
      "skein1024-80": 45930,
      "skein1024-88": 45931,
      "skein1024-96": 45932,
      "skein1024-104": 45933,
      "skein1024-112": 45934,
      "skein1024-120": 45935,
      "skein1024-128": 45936,
      "skein1024-136": 45937,
      "skein1024-144": 45938,
      "skein1024-152": 45939,
      "skein1024-160": 45940,
      "skein1024-168": 45941,
      "skein1024-176": 45942,
      "skein1024-184": 45943,
      "skein1024-192": 45944,
      "skein1024-200": 45945,
      "skein1024-208": 45946,
      "skein1024-216": 45947,
      "skein1024-224": 45948,
      "skein1024-232": 45949,
      "skein1024-240": 45950,
      "skein1024-248": 45951,
      "skein1024-256": 45952,
      "skein1024-264": 45953,
      "skein1024-272": 45954,
      "skein1024-280": 45955,
      "skein1024-288": 45956,
      "skein1024-296": 45957,
      "skein1024-304": 45958,
      "skein1024-312": 45959,
      "skein1024-320": 45960,
      "skein1024-328": 45961,
      "skein1024-336": 45962,
      "skein1024-344": 45963,
      "skein1024-352": 45964,
      "skein1024-360": 45965,
      "skein1024-368": 45966,
      "skein1024-376": 45967,
      "skein1024-384": 45968,
      "skein1024-392": 45969,
      "skein1024-400": 45970,
      "skein1024-408": 45971,
      "skein1024-416": 45972,
      "skein1024-424": 45973,
      "skein1024-432": 45974,
      "skein1024-440": 45975,
      "skein1024-448": 45976,
      "skein1024-456": 45977,
      "skein1024-464": 45978,
      "skein1024-472": 45979,
      "skein1024-480": 45980,
      "skein1024-488": 45981,
      "skein1024-496": 45982,
      "skein1024-504": 45983,
      "skein1024-512": 45984,
      "skein1024-520": 45985,
      "skein1024-528": 45986,
      "skein1024-536": 45987,
      "skein1024-544": 45988,
      "skein1024-552": 45989,
      "skein1024-560": 45990,
      "skein1024-568": 45991,
      "skein1024-576": 45992,
      "skein1024-584": 45993,
      "skein1024-592": 45994,
      "skein1024-600": 45995,
      "skein1024-608": 45996,
      "skein1024-616": 45997,
      "skein1024-624": 45998,
      "skein1024-632": 45999,
      "skein1024-640": 46e3,
      "skein1024-648": 46001,
      "skein1024-656": 46002,
      "skein1024-664": 46003,
      "skein1024-672": 46004,
      "skein1024-680": 46005,
      "skein1024-688": 46006,
      "skein1024-696": 46007,
      "skein1024-704": 46008,
      "skein1024-712": 46009,
      "skein1024-720": 46010,
      "skein1024-728": 46011,
      "skein1024-736": 46012,
      "skein1024-744": 46013,
      "skein1024-752": 46014,
      "skein1024-760": 46015,
      "skein1024-768": 46016,
      "skein1024-776": 46017,
      "skein1024-784": 46018,
      "skein1024-792": 46019,
      "skein1024-800": 46020,
      "skein1024-808": 46021,
      "skein1024-816": 46022,
      "skein1024-824": 46023,
      "skein1024-832": 46024,
      "skein1024-840": 46025,
      "skein1024-848": 46026,
      "skein1024-856": 46027,
      "skein1024-864": 46028,
      "skein1024-872": 46029,
      "skein1024-880": 46030,
      "skein1024-888": 46031,
      "skein1024-896": 46032,
      "skein1024-904": 46033,
      "skein1024-912": 46034,
      "skein1024-920": 46035,
      "skein1024-928": 46036,
      "skein1024-936": 46037,
      "skein1024-944": 46038,
      "skein1024-952": 46039,
      "skein1024-960": 46040,
      "skein1024-968": 46041,
      "skein1024-976": 46042,
      "skein1024-984": 46043,
      "skein1024-992": 46044,
      "skein1024-1000": 46045,
      "skein1024-1008": 46046,
      "skein1024-1016": 46047,
      "skein1024-1024": 46048,
      "poseidon-bls12_381-a2-fc1": 46081,
      "poseidon-bls12_381-a2-fc1-sc": 46082,
      "zeroxcert-imprint-256": 52753,
      "fil-commitment-unsealed": 61697,
      "fil-commitment-sealed": 61698,
      "holochain-adr-v0": 8417572,
      "holochain-adr-v1": 8483108,
      "holochain-key-v0": 9728292,
      "holochain-key-v1": 9793828,
      "holochain-sig-v0": 10645796,
      "holochain-sig-v1": 10711332,
      "skynet-ns": 11639056,
      "arweave-ns": 11704592
    });
    module2.exports = { baseTable };
  }
});

// ../../node_modules/multicodec/src/maps.js
var require_maps = __commonJS({
  "../../node_modules/multicodec/src/maps.js"(exports2, module2) {
    "use strict";
    var { baseTable } = require_generated_table();
    var varintEncode = require_util3().varintEncode;
    var nameToVarint = {};
    var constantToCode = {};
    var codeToName = {};
    for (const name3 in baseTable) {
      const codecName = name3;
      const code3 = baseTable[codecName];
      nameToVarint[codecName] = varintEncode(code3);
      const constant = codecName.toUpperCase().replace(/-/g, "_");
      constantToCode[constant] = code3;
      if (!codeToName[code3]) {
        codeToName[code3] = codecName;
      }
    }
    Object.freeze(nameToVarint);
    Object.freeze(constantToCode);
    Object.freeze(codeToName);
    var nameToCode = Object.freeze(baseTable);
    module2.exports = {
      nameToVarint,
      constantToCode,
      nameToCode,
      codeToName
    };
  }
});

// ../../node_modules/multicodec/src/index.js
var require_src6 = __commonJS({
  "../../node_modules/multicodec/src/index.js"(exports2, module2) {
    "use strict";
    var varint4 = require_varint2();
    var { concat: uint8ArrayConcat } = (init_concat(), concat_exports);
    var util = require_util3();
    var { nameToVarint, constantToCode, nameToCode, codeToName } = require_maps();
    function addPrefix(multicodecStrOrCode, data) {
      let prefix;
      if (multicodecStrOrCode instanceof Uint8Array) {
        prefix = util.varintUint8ArrayEncode(multicodecStrOrCode);
      } else {
        if (nameToVarint[multicodecStrOrCode]) {
          prefix = nameToVarint[multicodecStrOrCode];
        } else {
          throw new Error("multicodec not recognized");
        }
      }
      return uint8ArrayConcat([prefix, data], prefix.length + data.length);
    }
    function rmPrefix(data) {
      varint4.decode(data);
      return data.slice(varint4.decode.bytes);
    }
    function getNameFromData(prefixedData) {
      const code3 = varint4.decode(prefixedData);
      const name3 = codeToName[code3];
      if (name3 === void 0) {
        throw new Error(`Code "${code3}" not found`);
      }
      return name3;
    }
    function getNameFromCode(codec) {
      return codeToName[codec];
    }
    function getCodeFromName(name3) {
      const code3 = nameToCode[name3];
      if (code3 === void 0) {
        throw new Error(`Codec "${name3}" not found`);
      }
      return code3;
    }
    function getCodeFromData(prefixedData) {
      return varint4.decode(prefixedData);
    }
    function getVarintFromName(name3) {
      const code3 = nameToVarint[name3];
      if (code3 === void 0) {
        throw new Error(`Codec "${name3}" not found`);
      }
      return code3;
    }
    function getVarintFromCode(code3) {
      return util.varintEncode(code3);
    }
    function getCodec(prefixedData) {
      return getNameFromData(prefixedData);
    }
    function getName(codec) {
      return getNameFromCode(codec);
    }
    function getNumber(name3) {
      return getCodeFromName(name3);
    }
    function getCode(prefixedData) {
      return getCodeFromData(prefixedData);
    }
    function getCodeVarint(name3) {
      return getVarintFromName(name3);
    }
    function getVarint(code3) {
      return Array.from(getVarintFromCode(code3));
    }
    module2.exports = {
      addPrefix,
      rmPrefix,
      getNameFromData,
      getNameFromCode,
      getCodeFromName,
      getCodeFromData,
      getVarintFromName,
      getVarintFromCode,
      getCodec,
      getName,
      getNumber,
      getCode,
      getCodeVarint,
      getVarint,
      ...constantToCode,
      nameToVarint,
      nameToCode,
      codeToName
    };
  }
});

// ../../node_modules/cids/src/cid-util.js
var require_cid_util = __commonJS({
  "../../node_modules/cids/src/cid-util.js"(exports2, module2) {
    "use strict";
    var mh = require_src3();
    var CIDUtil = {
      checkCIDComponents: function(other) {
        if (other == null) {
          return "null values are not valid CIDs";
        }
        if (!(other.version === 0 || other.version === 1)) {
          return "Invalid version, must be a number equal to 1 or 0";
        }
        if (typeof other.codec !== "string") {
          return "codec must be string";
        }
        if (other.version === 0) {
          if (other.codec !== "dag-pb") {
            return "codec must be 'dag-pb' for CIDv0";
          }
          if (other.multibaseName !== "base58btc") {
            return "multibaseName must be 'base58btc' for CIDv0";
          }
        }
        if (!(other.multihash instanceof Uint8Array)) {
          return "multihash must be a Uint8Array";
        }
        try {
          mh.validate(other.multihash);
        } catch (err) {
          let errorMsg = err.message;
          if (!errorMsg) {
            errorMsg = "Multihash validation failed";
          }
          return errorMsg;
        }
      }
    };
    module2.exports = CIDUtil;
  }
});

// ../../node_modules/cids/src/index.js
var require_src7 = __commonJS({
  "../../node_modules/cids/src/index.js"(exports2, module2) {
    "use strict";
    var mh = require_src3();
    var multibase = require_src2();
    var multicodec = require_src6();
    var CIDUtil = require_cid_util();
    var { concat: uint8ArrayConcat } = (init_concat(), concat_exports);
    var { toString: uint8ArrayToString } = (init_to_string(), to_string_exports);
    var { equals: uint8ArrayEquals } = (init_equals(), equals_exports);
    var codecs2 = multicodec.nameToCode;
    var codecInts = Object.keys(codecs2).reduce((p, name3) => {
      p[codecs2[name3]] = name3;
      return p;
    }, {});
    var symbol = Symbol.for("@ipld/js-cid/CID");
    var CID2 = class {
      constructor(version3, codec, multihash, multibaseName) {
        this.version;
        this.codec;
        this.multihash;
        Object.defineProperty(this, symbol, { value: true });
        if (CID2.isCID(version3)) {
          const cid = version3;
          this.version = cid.version;
          this.codec = cid.codec;
          this.multihash = cid.multihash;
          this.multibaseName = cid.multibaseName || (cid.version === 0 ? "base58btc" : "base32");
          return;
        }
        if (typeof version3 === "string") {
          const baseName = multibase.isEncoded(version3);
          if (baseName) {
            const cid = multibase.decode(version3);
            this.version = parseInt(cid[0].toString(), 16);
            this.codec = multicodec.getCodec(cid.slice(1));
            this.multihash = multicodec.rmPrefix(cid.slice(1));
            this.multibaseName = baseName;
          } else {
            this.version = 0;
            this.codec = "dag-pb";
            this.multihash = mh.fromB58String(version3);
            this.multibaseName = "base58btc";
          }
          CID2.validateCID(this);
          Object.defineProperty(this, "string", { value: version3 });
          return;
        }
        if (version3 instanceof Uint8Array) {
          const v = parseInt(version3[0].toString(), 16);
          if (v === 1) {
            const cid = version3;
            this.version = v;
            this.codec = multicodec.getCodec(cid.slice(1));
            this.multihash = multicodec.rmPrefix(cid.slice(1));
            this.multibaseName = "base32";
          } else {
            this.version = 0;
            this.codec = "dag-pb";
            this.multihash = version3;
            this.multibaseName = "base58btc";
          }
          CID2.validateCID(this);
          return;
        }
        this.version = version3;
        if (typeof codec === "number") {
          codec = codecInts[codec];
        }
        this.codec = codec;
        this.multihash = multihash;
        this.multibaseName = multibaseName || (version3 === 0 ? "base58btc" : "base32");
        CID2.validateCID(this);
      }
      get bytes() {
        let bytes = this._bytes;
        if (!bytes) {
          if (this.version === 0) {
            bytes = this.multihash;
          } else if (this.version === 1) {
            const codec = multicodec.getCodeVarint(this.codec);
            bytes = uint8ArrayConcat([
              [1],
              codec,
              this.multihash
            ], 1 + codec.byteLength + this.multihash.byteLength);
          } else {
            throw new Error("unsupported version");
          }
          Object.defineProperty(this, "_bytes", { value: bytes });
        }
        return bytes;
      }
      get prefix() {
        const codec = multicodec.getCodeVarint(this.codec);
        const multihash = mh.prefix(this.multihash);
        const prefix = uint8ArrayConcat([
          [this.version],
          codec,
          multihash
        ], 1 + codec.byteLength + multihash.byteLength);
        return prefix;
      }
      get code() {
        return codecs2[this.codec];
      }
      toV0() {
        if (this.codec !== "dag-pb") {
          throw new Error("Cannot convert a non dag-pb CID to CIDv0");
        }
        const { name: name3, length: length2 } = mh.decode(this.multihash);
        if (name3 !== "sha2-256") {
          throw new Error("Cannot convert non sha2-256 multihash CID to CIDv0");
        }
        if (length2 !== 32) {
          throw new Error("Cannot convert non 32 byte multihash CID to CIDv0");
        }
        return new CID2(0, this.codec, this.multihash);
      }
      toV1() {
        return new CID2(1, this.codec, this.multihash, this.multibaseName);
      }
      toBaseEncodedString(base3 = this.multibaseName) {
        if (this.string && this.string.length !== 0 && base3 === this.multibaseName) {
          return this.string;
        }
        let str;
        if (this.version === 0) {
          if (base3 !== "base58btc") {
            throw new Error("not supported with CIDv0, to support different bases, please migrate the instance do CIDv1, you can do that through cid.toV1()");
          }
          str = mh.toB58String(this.multihash);
        } else if (this.version === 1) {
          str = uint8ArrayToString(multibase.encode(base3, this.bytes));
        } else {
          throw new Error("unsupported version");
        }
        if (base3 === this.multibaseName) {
          Object.defineProperty(this, "string", { value: str });
        }
        return str;
      }
      [Symbol.for("nodejs.util.inspect.custom")]() {
        return "CID(" + this.toString() + ")";
      }
      toString(base3) {
        return this.toBaseEncodedString(base3);
      }
      toJSON() {
        return {
          codec: this.codec,
          version: this.version,
          hash: this.multihash
        };
      }
      equals(other) {
        return this.codec === other.codec && this.version === other.version && uint8ArrayEquals(this.multihash, other.multihash);
      }
      static validateCID(other) {
        const errorMsg = CIDUtil.checkCIDComponents(other);
        if (errorMsg) {
          throw new Error(errorMsg);
        }
      }
      static isCID(value) {
        return value instanceof CID2 || Boolean(value && value[symbol]);
      }
    };
    CID2.codecs = codecs2;
    module2.exports = CID2;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/utils/persist.js
var require_persist = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/utils/persist.js"(exports2, module2) {
    "use strict";
    var mh = require_src4();
    var CID2 = require_src7();
    var persist = async (buffer, block, options) => {
      if (!options.codec) {
        options.codec = "dag-pb";
      }
      if (!options.cidVersion) {
        options.cidVersion = 0;
      }
      if (!options.hashAlg) {
        options.hashAlg = "sha2-256";
      }
      if (options.hashAlg !== "sha2-256") {
        options.cidVersion = 1;
      }
      const multihash = await mh(buffer, options.hashAlg);
      const cid = new CID2(options.cidVersion, options.codec, multihash);
      if (!options.onlyHash) {
        await block.put(buffer, {
          pin: options.pin,
          preload: options.preload,
          timeout: options.timeout,
          cid
        });
      }
      return cid;
    };
    module2.exports = persist;
  }
});

// ../../node_modules/ipld-dag-pb/src/dag.js
var require_dag = __commonJS({
  "../../node_modules/ipld-dag-pb/src/dag.js"(exports2, module2) {
    "use strict";
    var $protobuf = require_minimal2();
    var $Reader = $protobuf.Reader;
    var $Writer = $protobuf.Writer;
    var $util = $protobuf.util;
    var $root = $protobuf.roots["default"] || ($protobuf.roots["default"] = {});
    $root.PBLink = function() {
      function PBLink(p) {
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null)
              this[ks[i]] = p[ks[i]];
        }
      }
      PBLink.prototype.Hash = $util.newBuffer([]);
      PBLink.prototype.Name = "";
      PBLink.prototype.Tsize = $util.Long ? $util.Long.fromBits(0, 0, true) : 0;
      PBLink.encode = function encode5(m, w) {
        if (!w)
          w = $Writer.create();
        if (m.Hash != null && Object.hasOwnProperty.call(m, "Hash"))
          w.uint32(10).bytes(m.Hash);
        if (m.Name != null && Object.hasOwnProperty.call(m, "Name"))
          w.uint32(18).string(m.Name);
        if (m.Tsize != null && Object.hasOwnProperty.call(m, "Tsize"))
          w.uint32(24).uint64(m.Tsize);
        return w;
      };
      PBLink.decode = function decode7(r, l) {
        if (!(r instanceof $Reader))
          r = $Reader.create(r);
        var c = l === void 0 ? r.len : r.pos + l, m = new $root.PBLink();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 1:
              m.Hash = r.bytes();
              break;
            case 2:
              m.Name = r.string();
              break;
            case 3:
              m.Tsize = r.uint64();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      PBLink.fromObject = function fromObject(d) {
        if (d instanceof $root.PBLink)
          return d;
        var m = new $root.PBLink();
        if (d.Hash != null) {
          if (typeof d.Hash === "string")
            $util.base64.decode(d.Hash, m.Hash = $util.newBuffer($util.base64.length(d.Hash)), 0);
          else if (d.Hash.length)
            m.Hash = d.Hash;
        }
        if (d.Name != null) {
          m.Name = String(d.Name);
        }
        if (d.Tsize != null) {
          if ($util.Long)
            (m.Tsize = $util.Long.fromValue(d.Tsize)).unsigned = true;
          else if (typeof d.Tsize === "string")
            m.Tsize = parseInt(d.Tsize, 10);
          else if (typeof d.Tsize === "number")
            m.Tsize = d.Tsize;
          else if (typeof d.Tsize === "object")
            m.Tsize = new $util.LongBits(d.Tsize.low >>> 0, d.Tsize.high >>> 0).toNumber(true);
        }
        return m;
      };
      PBLink.toObject = function toObject(m, o) {
        if (!o)
          o = {};
        var d = {};
        if (o.defaults) {
          if (o.bytes === String)
            d.Hash = "";
          else {
            d.Hash = [];
            if (o.bytes !== Array)
              d.Hash = $util.newBuffer(d.Hash);
          }
          d.Name = "";
          if ($util.Long) {
            var n = new $util.Long(0, 0, true);
            d.Tsize = o.longs === String ? n.toString() : o.longs === Number ? n.toNumber() : n;
          } else
            d.Tsize = o.longs === String ? "0" : 0;
        }
        if (m.Hash != null && m.hasOwnProperty("Hash")) {
          d.Hash = o.bytes === String ? $util.base64.encode(m.Hash, 0, m.Hash.length) : o.bytes === Array ? Array.prototype.slice.call(m.Hash) : m.Hash;
        }
        if (m.Name != null && m.hasOwnProperty("Name")) {
          d.Name = m.Name;
        }
        if (m.Tsize != null && m.hasOwnProperty("Tsize")) {
          if (typeof m.Tsize === "number")
            d.Tsize = o.longs === String ? String(m.Tsize) : m.Tsize;
          else
            d.Tsize = o.longs === String ? $util.Long.prototype.toString.call(m.Tsize) : o.longs === Number ? new $util.LongBits(m.Tsize.low >>> 0, m.Tsize.high >>> 0).toNumber(true) : m.Tsize;
        }
        return d;
      };
      PBLink.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return PBLink;
    }();
    $root.PBNode = function() {
      function PBNode(p) {
        this.Links = [];
        if (p) {
          for (var ks = Object.keys(p), i = 0; i < ks.length; ++i)
            if (p[ks[i]] != null)
              this[ks[i]] = p[ks[i]];
        }
      }
      PBNode.prototype.Links = $util.emptyArray;
      PBNode.prototype.Data = $util.newBuffer([]);
      PBNode.encode = function encode5(m, w) {
        if (!w)
          w = $Writer.create();
        if (m.Data != null && Object.hasOwnProperty.call(m, "Data"))
          w.uint32(10).bytes(m.Data);
        if (m.Links != null && m.Links.length) {
          for (var i = 0; i < m.Links.length; ++i)
            $root.PBLink.encode(m.Links[i], w.uint32(18).fork()).ldelim();
        }
        return w;
      };
      PBNode.decode = function decode7(r, l) {
        if (!(r instanceof $Reader))
          r = $Reader.create(r);
        var c = l === void 0 ? r.len : r.pos + l, m = new $root.PBNode();
        while (r.pos < c) {
          var t = r.uint32();
          switch (t >>> 3) {
            case 2:
              if (!(m.Links && m.Links.length))
                m.Links = [];
              m.Links.push($root.PBLink.decode(r, r.uint32()));
              break;
            case 1:
              m.Data = r.bytes();
              break;
            default:
              r.skipType(t & 7);
              break;
          }
        }
        return m;
      };
      PBNode.fromObject = function fromObject(d) {
        if (d instanceof $root.PBNode)
          return d;
        var m = new $root.PBNode();
        if (d.Links) {
          if (!Array.isArray(d.Links))
            throw TypeError(".PBNode.Links: array expected");
          m.Links = [];
          for (var i = 0; i < d.Links.length; ++i) {
            if (typeof d.Links[i] !== "object")
              throw TypeError(".PBNode.Links: object expected");
            m.Links[i] = $root.PBLink.fromObject(d.Links[i]);
          }
        }
        if (d.Data != null) {
          if (typeof d.Data === "string")
            $util.base64.decode(d.Data, m.Data = $util.newBuffer($util.base64.length(d.Data)), 0);
          else if (d.Data.length)
            m.Data = d.Data;
        }
        return m;
      };
      PBNode.toObject = function toObject(m, o) {
        if (!o)
          o = {};
        var d = {};
        if (o.arrays || o.defaults) {
          d.Links = [];
        }
        if (o.defaults) {
          if (o.bytes === String)
            d.Data = "";
          else {
            d.Data = [];
            if (o.bytes !== Array)
              d.Data = $util.newBuffer(d.Data);
          }
        }
        if (m.Data != null && m.hasOwnProperty("Data")) {
          d.Data = o.bytes === String ? $util.base64.encode(m.Data, 0, m.Data.length) : o.bytes === Array ? Array.prototype.slice.call(m.Data) : m.Data;
        }
        if (m.Links && m.Links.length) {
          d.Links = [];
          for (var j = 0; j < m.Links.length; ++j) {
            d.Links[j] = $root.PBLink.toObject(m.Links[j], o);
          }
        }
        return d;
      };
      PBNode.prototype.toJSON = function toJSON() {
        return this.constructor.toObject(this, $protobuf.util.toJSONOptions);
      };
      return PBNode;
    }();
    module2.exports = $root;
  }
});

// ../../node_modules/ipld-dag-pb/node_modules/uint8arrays/util/bases.js
var require_bases = __commonJS({
  "../../node_modules/ipld-dag-pb/node_modules/uint8arrays/util/bases.js"(exports2, module2) {
    "use strict";
    var { bases: bases2 } = (init_basics(), basics_exports);
    function createCodec2(name3, prefix, encode5, decode7) {
      return {
        name: name3,
        prefix,
        encoder: {
          name: name3,
          prefix,
          encode: encode5
        },
        decoder: {
          decode: decode7
        }
      };
    }
    var string2 = createCodec2("utf8", "u", (buf) => {
      const decoder = new TextDecoder("utf8");
      return "u" + decoder.decode(buf);
    }, (str) => {
      const encoder = new TextEncoder();
      return encoder.encode(str.substring(1));
    });
    var ascii2 = createCodec2("ascii", "a", (buf) => {
      let string3 = "a";
      for (let i = 0; i < buf.length; i++) {
        string3 += String.fromCharCode(buf[i]);
      }
      return string3;
    }, (str) => {
      str = str.substring(1);
      const buf = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i);
      }
      return buf;
    });
    var BASES2 = {
      "utf8": string2,
      "utf-8": string2,
      "hex": bases2.base16,
      "latin1": ascii2,
      "ascii": ascii2,
      "binary": ascii2,
      ...bases2
    };
    module2.exports = BASES2;
  }
});

// ../../node_modules/ipld-dag-pb/node_modules/uint8arrays/from-string.js
var require_from_string = __commonJS({
  "../../node_modules/ipld-dag-pb/node_modules/uint8arrays/from-string.js"(exports2, module2) {
    "use strict";
    var bases2 = require_bases();
    function fromString3(string2, encoding = "utf8") {
      const base3 = bases2[encoding];
      if (!base3) {
        throw new Error(`Unsupported encoding "${encoding}"`);
      }
      return base3.decoder.decode(`${base3.prefix}${string2}`);
    }
    module2.exports = fromString3;
  }
});

// ../../node_modules/ipld-dag-pb/src/dag-link/dagLink.js
var require_dagLink = __commonJS({
  "../../node_modules/ipld-dag-pb/src/dag-link/dagLink.js"(exports2, module2) {
    "use strict";
    var CID2 = require_src7();
    var uint8ArrayFromString = require_from_string();
    var DAGLink = class {
      constructor(name3, size, cid) {
        if (!cid) {
          throw new Error("A link requires a cid to point to");
        }
        this.Name = name3 || "";
        this.Tsize = size;
        this.Hash = new CID2(cid);
        Object.defineProperties(this, {
          _nameBuf: { value: null, writable: true, enumerable: false }
        });
      }
      toString() {
        return `DAGLink <${this.Hash.toBaseEncodedString()} - name: "${this.Name}", size: ${this.Tsize}>`;
      }
      toJSON() {
        if (!this._json) {
          this._json = Object.freeze({
            name: this.Name,
            size: this.Tsize,
            cid: this.Hash.toBaseEncodedString()
          });
        }
        return Object.assign({}, this._json);
      }
      get nameAsBuffer() {
        if (this._nameBuf != null) {
          return this._nameBuf;
        }
        this._nameBuf = uint8ArrayFromString(this.Name);
        return this._nameBuf;
      }
    };
    module2.exports = DAGLink;
  }
});

// ../../node_modules/stable/stable.js
var require_stable = __commonJS({
  "../../node_modules/stable/stable.js"(exports2, module2) {
    (function(global2, factory) {
      typeof exports2 === "object" && typeof module2 !== "undefined" ? module2.exports = factory() : typeof define === "function" && define.amd ? define(factory) : global2.stable = factory();
    })(exports2, function() {
      "use strict";
      var stable = function(arr, comp) {
        return exec(arr.slice(), comp);
      };
      stable.inplace = function(arr, comp) {
        var result = exec(arr, comp);
        if (result !== arr) {
          pass(result, null, arr.length, arr);
        }
        return arr;
      };
      function exec(arr, comp) {
        if (typeof comp !== "function") {
          comp = function(a, b) {
            return String(a).localeCompare(b);
          };
        }
        var len = arr.length;
        if (len <= 1) {
          return arr;
        }
        var buffer = new Array(len);
        for (var chk = 1; chk < len; chk *= 2) {
          pass(arr, comp, chk, buffer);
          var tmp = arr;
          arr = buffer;
          buffer = tmp;
        }
        return arr;
      }
      var pass = function(arr, comp, chk, result) {
        var len = arr.length;
        var i = 0;
        var dbl = chk * 2;
        var l, r, e;
        var li, ri;
        for (l = 0; l < len; l += dbl) {
          r = l + chk;
          e = r + chk;
          if (r > len)
            r = len;
          if (e > len)
            e = len;
          li = l;
          ri = r;
          while (true) {
            if (li < r && ri < e) {
              if (comp(arr[li], arr[ri]) <= 0) {
                result[i++] = arr[li++];
              } else {
                result[i++] = arr[ri++];
              }
            } else if (li < r) {
              result[i++] = arr[li++];
            } else if (ri < e) {
              result[i++] = arr[ri++];
            } else {
              break;
            }
          }
        }
      };
      return stable;
    });
  }
});

// ../../node_modules/ipld-dag-pb/node_modules/uint8arrays/compare.js
var require_compare = __commonJS({
  "../../node_modules/ipld-dag-pb/node_modules/uint8arrays/compare.js"(exports2, module2) {
    "use strict";
    function compare(a, b) {
      for (let i = 0; i < a.byteLength; i++) {
        if (a[i] < b[i]) {
          return -1;
        }
        if (a[i] > b[i]) {
          return 1;
        }
      }
      if (a.byteLength > b.byteLength) {
        return 1;
      }
      if (a.byteLength < b.byteLength) {
        return -1;
      }
      return 0;
    }
    module2.exports = compare;
  }
});

// ../../node_modules/ipld-dag-pb/src/dag-node/sortLinks.js
var require_sortLinks = __commonJS({
  "../../node_modules/ipld-dag-pb/src/dag-node/sortLinks.js"(exports2, module2) {
    "use strict";
    var sort = require_stable();
    var uint8ArrayCompare = require_compare();
    var linkSort = (a, b) => {
      const buf1 = a.nameAsBuffer;
      const buf2 = b.nameAsBuffer;
      return uint8ArrayCompare(buf1, buf2);
    };
    var sortLinks = (links) => {
      sort.inplace(links, linkSort);
    };
    module2.exports = sortLinks;
  }
});

// ../../node_modules/ipld-dag-pb/src/dag-link/util.js
var require_util4 = __commonJS({
  "../../node_modules/ipld-dag-pb/src/dag-link/util.js"(exports2, module2) {
    "use strict";
    var DAGLink = require_dagLink();
    function createDagLinkFromB58EncodedHash(link) {
      return new DAGLink(link.Name || link.name || "", link.Tsize || link.Size || link.size || 0, link.Hash || link.hash || link.multihash || link.cid);
    }
    module2.exports = {
      createDagLinkFromB58EncodedHash
    };
  }
});

// ../../node_modules/ipld-dag-pb/src/serialize.js
var require_serialize = __commonJS({
  "../../node_modules/ipld-dag-pb/src/serialize.js"(exports2, module2) {
    "use strict";
    var protobuf = require_minimal2();
    var {
      PBLink
    } = require_dag();
    var {
      createDagLinkFromB58EncodedHash
    } = require_util4();
    var toProtoBuf = (node) => {
      const pbn = {};
      if (node.Data && node.Data.byteLength > 0) {
        pbn.Data = node.Data;
      } else {
        pbn.Data = null;
      }
      if (node.Links && node.Links.length > 0) {
        pbn.Links = node.Links.map((link) => ({
          Hash: link.Hash.bytes,
          Name: link.Name,
          Tsize: link.Tsize
        }));
      } else {
        pbn.Links = null;
      }
      return pbn;
    };
    var serializeDAGNode = (node) => {
      return encode5(toProtoBuf(node));
    };
    var serializeDAGNodeLike = (data, links = []) => {
      const node = {
        Data: data,
        Links: links.map((link) => {
          return createDagLinkFromB58EncodedHash(link);
        })
      };
      return encode5(toProtoBuf(node));
    };
    module2.exports = {
      serializeDAGNode,
      serializeDAGNodeLike
    };
    function encode5(pbf) {
      const writer = protobuf.Writer.create();
      if (pbf.Links != null) {
        for (let i = 0; i < pbf.Links.length; i++) {
          PBLink.encode(pbf.Links[i], writer.uint32(18).fork()).ldelim();
        }
      }
      if (pbf.Data != null) {
        writer.uint32(10).bytes(pbf.Data);
      }
      return writer.finish();
    }
  }
});

// ../../node_modules/ipld-dag-pb/src/genCid.js
var require_genCid = __commonJS({
  "../../node_modules/ipld-dag-pb/src/genCid.js"(exports2, module2) {
    "use strict";
    var CID2 = require_src7();
    var multicodec = require_src6();
    var multihashing = require_src4();
    var { multihash } = multihashing;
    var codec = multicodec.DAG_PB;
    var defaultHashAlg = multihash.names["sha2-256"];
    var cid = async (binaryBlob, userOptions = {}) => {
      const options = {
        cidVersion: userOptions.cidVersion == null ? 1 : userOptions.cidVersion,
        hashAlg: userOptions.hashAlg == null ? defaultHashAlg : userOptions.hashAlg
      };
      const hashName = multihash.codes[options.hashAlg];
      const hash = await multihashing(binaryBlob, hashName);
      const codecName = multicodec.getNameFromCode(codec);
      const cid2 = new CID2(options.cidVersion, codecName, hash);
      return cid2;
    };
    module2.exports = {
      codec,
      defaultHashAlg,
      cid
    };
  }
});

// ../../node_modules/ipld-dag-pb/src/dag-node/toDagLink.js
var require_toDagLink = __commonJS({
  "../../node_modules/ipld-dag-pb/src/dag-node/toDagLink.js"(exports2, module2) {
    "use strict";
    var DAGLink = require_dagLink();
    var genCid = require_genCid();
    var toDAGLink = async (node, options = {}) => {
      const buf = node.serialize();
      const nodeCid = await genCid.cid(buf, options);
      return new DAGLink(options.name || "", node.size, nodeCid);
    };
    module2.exports = toDAGLink;
  }
});

// ../../node_modules/ipld-dag-pb/src/dag-node/addLink.js
var require_addLink = __commonJS({
  "../../node_modules/ipld-dag-pb/src/dag-node/addLink.js"(exports2, module2) {
    "use strict";
    var sortLinks = require_sortLinks();
    var DAGLink = require_dagLink();
    var asDAGLink = (link) => {
      if (link instanceof DAGLink) {
        return link;
      }
      if (!("cid" in link || "hash" in link || "Hash" in link || "multihash" in link)) {
        throw new Error("Link must be a DAGLink or DAGLink-like. Convert the DAGNode into a DAGLink via `node.toDAGLink()`.");
      }
      return new DAGLink(link.Name || link.name, link.Tsize || link.size, link.Hash || link.multihash || link.hash || link.cid);
    };
    var addLink = (node, link) => {
      const dagLink = asDAGLink(link);
      node.Links.push(dagLink);
      sortLinks(node.Links);
    };
    module2.exports = addLink;
  }
});

// ../../node_modules/ipld-dag-pb/node_modules/uint8arrays/equals.js
var require_equals = __commonJS({
  "../../node_modules/ipld-dag-pb/node_modules/uint8arrays/equals.js"(exports2, module2) {
    "use strict";
    function equals4(a, b) {
      if (a === b) {
        return true;
      }
      if (a.byteLength !== b.byteLength) {
        return false;
      }
      for (let i = 0; i < a.byteLength; i++) {
        if (a[i] !== b[i]) {
          return false;
        }
      }
      return true;
    }
    module2.exports = equals4;
  }
});

// ../../node_modules/ipld-dag-pb/src/dag-node/rmLink.js
var require_rmLink = __commonJS({
  "../../node_modules/ipld-dag-pb/src/dag-node/rmLink.js"(exports2, module2) {
    "use strict";
    var CID2 = require_src7();
    var uint8ArrayEquals = require_equals();
    var rmLink = (dagNode, nameOrCid) => {
      let predicate = null;
      if (typeof nameOrCid === "string") {
        predicate = (link) => link.Name === nameOrCid;
      } else if (nameOrCid instanceof Uint8Array) {
        predicate = (link) => uint8ArrayEquals(link.Hash.bytes, nameOrCid);
      } else if (CID2.isCID(nameOrCid)) {
        predicate = (link) => uint8ArrayEquals(link.Hash.bytes, nameOrCid.bytes);
      }
      if (predicate) {
        const links = dagNode.Links;
        let index = 0;
        while (index < links.length) {
          const link = links[index];
          if (predicate(link)) {
            links.splice(index, 1);
          } else {
            index++;
          }
        }
      } else {
        throw new Error("second arg needs to be a name or CID");
      }
    };
    module2.exports = rmLink;
  }
});

// ../../node_modules/ipld-dag-pb/node_modules/uint8arrays/to-string.js
var require_to_string = __commonJS({
  "../../node_modules/ipld-dag-pb/node_modules/uint8arrays/to-string.js"(exports2, module2) {
    "use strict";
    var bases2 = require_bases();
    function toString3(array, encoding = "utf8") {
      const base3 = bases2[encoding];
      if (!base3) {
        throw new Error(`Unsupported encoding "${encoding}"`);
      }
      return base3.encoder.encode(array).substring(1);
    }
    module2.exports = toString3;
  }
});

// ../../node_modules/ipld-dag-pb/src/dag-node/dagNode.js
var require_dagNode = __commonJS({
  "../../node_modules/ipld-dag-pb/src/dag-node/dagNode.js"(exports2, module2) {
    "use strict";
    var sortLinks = require_sortLinks();
    var DAGLink = require_dagLink();
    var { createDagLinkFromB58EncodedHash } = require_util4();
    var { serializeDAGNode } = require_serialize();
    var toDAGLink = require_toDagLink();
    var addLink = require_addLink();
    var rmLink = require_rmLink();
    var uint8ArrayFromString = require_from_string();
    var uint8ArrayToString = require_to_string();
    var DAGNode = class {
      constructor(data, links = [], serializedSize = null) {
        if (!data) {
          data = new Uint8Array(0);
        }
        if (typeof data === "string") {
          data = uint8ArrayFromString(data);
        }
        if (!(data instanceof Uint8Array)) {
          throw new Error("Passed 'data' is not a Uint8Array or a String!");
        }
        if (serializedSize !== null && typeof serializedSize !== "number") {
          throw new Error("Passed 'serializedSize' must be a number!");
        }
        const sortedLinks = links.map((link) => {
          return link instanceof DAGLink ? link : createDagLinkFromB58EncodedHash(link);
        });
        sortLinks(sortedLinks);
        this.Data = data;
        this.Links = sortedLinks;
        Object.defineProperties(this, {
          _serializedSize: { value: serializedSize, writable: true, enumerable: false },
          _size: { value: null, writable: true, enumerable: false }
        });
      }
      toJSON() {
        if (!this._json) {
          this._json = Object.freeze({
            data: this.Data,
            links: this.Links.map((l) => l.toJSON()),
            size: this.size
          });
        }
        return Object.assign({}, this._json);
      }
      toString() {
        return `DAGNode <data: "${uint8ArrayToString(this.Data, "base64urlpad")}", links: ${this.Links.length}, size: ${this.size}>`;
      }
      _invalidateCached() {
        this._serializedSize = null;
        this._size = null;
      }
      addLink(link) {
        this._invalidateCached();
        return addLink(this, link);
      }
      rmLink(link) {
        this._invalidateCached();
        return rmLink(this, link);
      }
      toDAGLink(options) {
        return toDAGLink(this, options);
      }
      serialize() {
        const buf = serializeDAGNode(this);
        this._serializedSize = buf.length;
        return buf;
      }
      get size() {
        if (this._size == null) {
          let serializedSize;
          if (serializedSize == null) {
            this._serializedSize = this.serialize().length;
            serializedSize = this._serializedSize;
          }
          this._size = this.Links.reduce((sum, l) => sum + l.Tsize, serializedSize);
        }
        return this._size;
      }
      set size(size) {
        throw new Error("Can't set property: 'size' is immutable");
      }
    };
    module2.exports = DAGNode;
  }
});

// ../../node_modules/ipld-dag-pb/src/util.js
var require_util5 = __commonJS({
  "../../node_modules/ipld-dag-pb/src/util.js"(exports2, module2) {
    "use strict";
    var {
      PBNode
    } = require_dag();
    var DAGLink = require_dagLink();
    var DAGNode = require_dagNode();
    var { serializeDAGNode, serializeDAGNodeLike } = require_serialize();
    var genCid = require_genCid();
    var cid = (binaryBlob, userOptions) => {
      return genCid.cid(binaryBlob, userOptions);
    };
    var serialize = (node) => {
      if (node instanceof DAGNode) {
        return serializeDAGNode(node);
      } else {
        return serializeDAGNodeLike(node.Data, node.Links);
      }
    };
    var deserialize = (buffer) => {
      const message = PBNode.decode(buffer);
      const pbn = PBNode.toObject(message, {
        defaults: false,
        arrays: true,
        longs: Number,
        objects: false
      });
      const links = pbn.Links.map((link) => {
        return new DAGLink(link.Name, link.Tsize, link.Hash);
      });
      const data = pbn.Data == null ? new Uint8Array(0) : pbn.Data;
      return new DAGNode(data, links, buffer.byteLength);
    };
    module2.exports = {
      codec: genCid.codec,
      defaultHashAlg: genCid.defaultHashAlg,
      serialize,
      deserialize,
      cid
    };
  }
});

// ../../node_modules/ipld-dag-pb/src/resolver.js
var require_resolver = __commonJS({
  "../../node_modules/ipld-dag-pb/src/resolver.js"(exports2) {
    "use strict";
    var CID2 = require_src7();
    var util = require_util5();
    exports2.resolve = (binaryBlob, path = "/") => {
      let node = util.deserialize(binaryBlob);
      const parts = path.split("/").filter(Boolean);
      while (parts.length) {
        const key = parts.shift();
        if (node[key] === void 0) {
          for (const link of node.Links) {
            if (link.Name === key) {
              return {
                value: link.Hash,
                remainderPath: parts.join("/")
              };
            }
          }
          throw new Error(`Object has no property '${key}'`);
        }
        node = node[key];
        if (CID2.isCID(node)) {
          return {
            value: node,
            remainderPath: parts.join("/")
          };
        }
      }
      return {
        value: node,
        remainderPath: ""
      };
    };
    exports2.tree = function* (binaryBlob) {
      const node = util.deserialize(binaryBlob);
      yield "Data";
      yield "Links";
      for (let ii = 0; ii < node.Links.length; ii++) {
        yield `Links/${ii}`;
        yield `Links/${ii}/Name`;
        yield `Links/${ii}/Tsize`;
        yield `Links/${ii}/Hash`;
      }
    };
  }
});

// ../../node_modules/ipld-dag-pb/src/index.js
var require_src8 = __commonJS({
  "../../node_modules/ipld-dag-pb/src/index.js"(exports2, module2) {
    "use strict";
    var resolver = require_resolver();
    var util = require_util5();
    var DAGNodeClass = require_dagNode();
    var DAGLinkClass = require_dagLink();
    var format = {
      DAGNode: DAGNodeClass,
      DAGLink: DAGLinkClass,
      resolver,
      util,
      codec: util.codec,
      defaultHashAlg: util.defaultHashAlg
    };
    module2.exports = format;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dag-builder/dir.js
var require_dir = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dag-builder/dir.js"(exports2, module2) {
    "use strict";
    var { UnixFS } = require_src5();
    var persist = require_persist();
    var {
      DAGNode
    } = require_src8();
    var dirBuilder = async (item, block, options) => {
      const unixfs = new UnixFS({
        type: "directory",
        mtime: item.mtime,
        mode: item.mode
      });
      const buffer = new DAGNode(unixfs.marshal()).serialize();
      const cid = await persist(buffer, block, options);
      const path = item.path;
      return {
        cid,
        path,
        unixfs,
        size: buffer.length
      };
    };
    module2.exports = dirBuilder;
  }
});

// ../../node_modules/it-all/index.js
var require_it_all = __commonJS({
  "../../node_modules/it-all/index.js"(exports2, module2) {
    "use strict";
    var all = async (source) => {
      const arr = [];
      for await (const entry of source) {
        arr.push(entry);
      }
      return arr;
    };
    module2.exports = all;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/flat.js
var require_flat = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/flat.js"(exports2, module2) {
    "use strict";
    var all = require_it_all();
    module2.exports = async function(source, reduce) {
      return reduce(await all(source));
    };
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/balanced.js
var require_balanced = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/balanced.js"(exports2, module2) {
    "use strict";
    var batch = require_it_batch();
    function balanced(source, reduce, options) {
      return reduceToParents(source, reduce, options);
    }
    async function reduceToParents(source, reduce, options) {
      const roots = [];
      for await (const chunked of batch(source, options.maxChildrenPerNode)) {
        roots.push(await reduce(chunked));
      }
      if (roots.length > 1) {
        return reduceToParents(roots, reduce, options);
      }
      return roots[0];
    }
    module2.exports = balanced;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/trickle.js
var require_trickle = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/trickle.js"(exports2, module2) {
    "use strict";
    var batch = require_it_batch();
    module2.exports = async function trickleStream(source, reduce, options) {
      const root = new Root(options.layerRepeat);
      let iteration = 0;
      let maxDepth = 1;
      let subTree = root;
      for await (const layer of batch(source, options.maxChildrenPerNode)) {
        if (subTree.isFull()) {
          if (subTree !== root) {
            root.addChild(await subTree.reduce(reduce));
          }
          if (iteration && iteration % options.layerRepeat === 0) {
            maxDepth++;
          }
          subTree = new SubTree(maxDepth, options.layerRepeat, iteration);
          iteration++;
        }
        subTree.append(layer);
      }
      if (subTree && subTree !== root) {
        root.addChild(await subTree.reduce(reduce));
      }
      return root.reduce(reduce);
    };
    var SubTree = class {
      constructor(maxDepth, layerRepeat, iteration = 0) {
        this.maxDepth = maxDepth;
        this.layerRepeat = layerRepeat;
        this.currentDepth = 1;
        this.iteration = iteration;
        this.root = this.node = this.parent = {
          children: [],
          depth: this.currentDepth,
          maxDepth,
          maxChildren: (this.maxDepth - this.currentDepth) * this.layerRepeat
        };
      }
      isFull() {
        if (!this.root.data) {
          return false;
        }
        if (this.currentDepth < this.maxDepth && this.node.maxChildren) {
          this._addNextNodeToParent(this.node);
          return false;
        }
        const distantRelative = this._findParent(this.node, this.currentDepth);
        if (distantRelative) {
          this._addNextNodeToParent(distantRelative);
          return false;
        }
        return true;
      }
      _addNextNodeToParent(parent) {
        this.parent = parent;
        const nextNode = {
          children: [],
          depth: parent.depth + 1,
          parent,
          maxDepth: this.maxDepth,
          maxChildren: Math.floor(parent.children.length / this.layerRepeat) * this.layerRepeat
        };
        parent.children.push(nextNode);
        this.currentDepth = nextNode.depth;
        this.node = nextNode;
      }
      append(layer) {
        this.node.data = layer;
      }
      reduce(reduce) {
        return this._reduce(this.root, reduce);
      }
      async _reduce(node, reduce) {
        let children = [];
        if (node.children.length) {
          children = await Promise.all(node.children.filter((child) => child.data).map((child) => this._reduce(child, reduce)));
        }
        return reduce((node.data || []).concat(children));
      }
      _findParent(node, depth) {
        const parent = node.parent;
        if (!parent || parent.depth === 0) {
          return;
        }
        if (parent.children.length === parent.maxChildren || !parent.maxChildren) {
          return this._findParent(parent, depth);
        }
        return parent;
      }
    };
    var Root = class extends SubTree {
      constructor(layerRepeat) {
        super(0, layerRepeat);
        this.root.depth = 0;
        this.currentDepth = 1;
      }
      addChild(child) {
        this.root.children.push(child);
      }
      reduce(reduce) {
        return reduce((this.root.data || []).concat(this.root.children));
      }
    };
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/buffer-importer.js
var require_buffer_importer = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/buffer-importer.js"(exports2, module2) {
    "use strict";
    var { UnixFS } = require_src5();
    var persist = require_persist();
    var {
      DAGNode
    } = require_src8();
    async function* bufferImporter(file, block, options) {
      for await (let buffer of file.content) {
        yield async () => {
          options.progress(buffer.length, file.path);
          let unixfs;
          const opts = {
            codec: "dag-pb",
            cidVersion: options.cidVersion,
            hashAlg: options.hashAlg,
            onlyHash: options.onlyHash
          };
          if (options.rawLeaves) {
            opts.codec = "raw";
            opts.cidVersion = 1;
          } else {
            unixfs = new UnixFS({
              type: options.leafType,
              data: buffer,
              mtime: file.mtime,
              mode: file.mode
            });
            buffer = new DAGNode(unixfs.marshal()).serialize();
          }
          return {
            cid: await persist(buffer, block, opts),
            unixfs,
            size: buffer.length
          };
        };
      }
    }
    module2.exports = bufferImporter;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/index.js
var require_file = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dag-builder/file/index.js"(exports2, module2) {
    "use strict";
    var errCode = require_err_code();
    var { UnixFS } = require_src5();
    var persist = require_persist();
    var {
      DAGNode,
      DAGLink
    } = require_src8();
    var parallelBatch = require_it_parallel_batch();
    var mh = require_src4().multihash;
    var dagBuilders = {
      flat: require_flat(),
      balanced: require_balanced(),
      trickle: require_trickle()
    };
    async function* buildFileBatch(file, block, options) {
      let count = -1;
      let previous;
      let bufferImporter;
      if (typeof options.bufferImporter === "function") {
        bufferImporter = options.bufferImporter;
      } else {
        bufferImporter = require_buffer_importer();
      }
      for await (const entry of parallelBatch(bufferImporter(file, block, options), options.blockWriteConcurrency)) {
        count++;
        if (count === 0) {
          previous = entry;
          continue;
        } else if (count === 1 && previous) {
          yield previous;
          previous = null;
        }
        yield entry;
      }
      if (previous) {
        previous.single = true;
        yield previous;
      }
    }
    var reduce = (file, block, options) => {
      async function reducer(leaves) {
        if (leaves.length === 1 && leaves[0].single && options.reduceSingleLeafToSelf) {
          const leaf = leaves[0];
          if (leaf.cid.codec === "raw" && (file.mtime !== void 0 || file.mode !== void 0)) {
            let { data: buffer2 } = await block.get(leaf.cid, options);
            leaf.unixfs = new UnixFS({
              type: "file",
              mtime: file.mtime,
              mode: file.mode,
              data: buffer2
            });
            const multihash = mh.decode(leaf.cid.multihash);
            buffer2 = new DAGNode(leaf.unixfs.marshal()).serialize();
            leaf.cid = await persist(buffer2, block, {
              ...options,
              codec: "dag-pb",
              hashAlg: multihash.name,
              cidVersion: options.cidVersion
            });
            leaf.size = buffer2.length;
          }
          return {
            cid: leaf.cid,
            path: file.path,
            unixfs: leaf.unixfs,
            size: leaf.size
          };
        }
        const f = new UnixFS({
          type: "file",
          mtime: file.mtime,
          mode: file.mode
        });
        const links = leaves.filter((leaf) => {
          if (leaf.cid.codec === "raw" && leaf.size) {
            return true;
          }
          if (leaf.unixfs && !leaf.unixfs.data && leaf.unixfs.fileSize()) {
            return true;
          }
          return Boolean(leaf.unixfs && leaf.unixfs.data && leaf.unixfs.data.length);
        }).map((leaf) => {
          if (leaf.cid.codec === "raw") {
            f.addBlockSize(leaf.size);
            return new DAGLink("", leaf.size, leaf.cid);
          }
          if (!leaf.unixfs || !leaf.unixfs.data) {
            f.addBlockSize(leaf.unixfs && leaf.unixfs.fileSize() || 0);
          } else {
            f.addBlockSize(leaf.unixfs.data.length);
          }
          return new DAGLink("", leaf.size, leaf.cid);
        });
        const node = new DAGNode(f.marshal(), links);
        const buffer = node.serialize();
        const cid = await persist(buffer, block, options);
        return {
          cid,
          path: file.path,
          unixfs: f,
          size: buffer.length + node.Links.reduce((acc, curr) => acc + curr.Tsize, 0)
        };
      }
      return reducer;
    };
    function fileBuilder(file, block, options) {
      const dagBuilder = dagBuilders[options.strategy];
      if (!dagBuilder) {
        throw errCode(new Error(`Unknown importer build strategy name: ${options.strategy}`), "ERR_BAD_STRATEGY");
      }
      return dagBuilder(buildFileBatch(file, block, options), reduce(file, block, options), options);
    }
    module2.exports = fileBuilder;
  }
});

// ../../node_modules/base64-js/index.js
var require_base64_js = __commonJS({
  "../../node_modules/base64-js/index.js"(exports2) {
    "use strict";
    exports2.byteLength = byteLength;
    exports2.toByteArray = toByteArray;
    exports2.fromByteArray = fromByteArray;
    var lookup = [];
    var revLookup = [];
    var Arr = typeof Uint8Array !== "undefined" ? Uint8Array : Array;
    var code3 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/";
    for (i = 0, len = code3.length; i < len; ++i) {
      lookup[i] = code3[i];
      revLookup[code3.charCodeAt(i)] = i;
    }
    var i;
    var len;
    revLookup["-".charCodeAt(0)] = 62;
    revLookup["_".charCodeAt(0)] = 63;
    function getLens(b64) {
      var len2 = b64.length;
      if (len2 % 4 > 0) {
        throw new Error("Invalid string. Length must be a multiple of 4");
      }
      var validLen = b64.indexOf("=");
      if (validLen === -1)
        validLen = len2;
      var placeHoldersLen = validLen === len2 ? 0 : 4 - validLen % 4;
      return [validLen, placeHoldersLen];
    }
    function byteLength(b64) {
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function _byteLength(b64, validLen, placeHoldersLen) {
      return (validLen + placeHoldersLen) * 3 / 4 - placeHoldersLen;
    }
    function toByteArray(b64) {
      var tmp;
      var lens = getLens(b64);
      var validLen = lens[0];
      var placeHoldersLen = lens[1];
      var arr = new Arr(_byteLength(b64, validLen, placeHoldersLen));
      var curByte = 0;
      var len2 = placeHoldersLen > 0 ? validLen - 4 : validLen;
      var i2;
      for (i2 = 0; i2 < len2; i2 += 4) {
        tmp = revLookup[b64.charCodeAt(i2)] << 18 | revLookup[b64.charCodeAt(i2 + 1)] << 12 | revLookup[b64.charCodeAt(i2 + 2)] << 6 | revLookup[b64.charCodeAt(i2 + 3)];
        arr[curByte++] = tmp >> 16 & 255;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 2) {
        tmp = revLookup[b64.charCodeAt(i2)] << 2 | revLookup[b64.charCodeAt(i2 + 1)] >> 4;
        arr[curByte++] = tmp & 255;
      }
      if (placeHoldersLen === 1) {
        tmp = revLookup[b64.charCodeAt(i2)] << 10 | revLookup[b64.charCodeAt(i2 + 1)] << 4 | revLookup[b64.charCodeAt(i2 + 2)] >> 2;
        arr[curByte++] = tmp >> 8 & 255;
        arr[curByte++] = tmp & 255;
      }
      return arr;
    }
    function tripletToBase64(num) {
      return lookup[num >> 18 & 63] + lookup[num >> 12 & 63] + lookup[num >> 6 & 63] + lookup[num & 63];
    }
    function encodeChunk(uint8, start, end) {
      var tmp;
      var output = [];
      for (var i2 = start; i2 < end; i2 += 3) {
        tmp = (uint8[i2] << 16 & 16711680) + (uint8[i2 + 1] << 8 & 65280) + (uint8[i2 + 2] & 255);
        output.push(tripletToBase64(tmp));
      }
      return output.join("");
    }
    function fromByteArray(uint8) {
      var tmp;
      var len2 = uint8.length;
      var extraBytes = len2 % 3;
      var parts = [];
      var maxChunkLength = 16383;
      for (var i2 = 0, len22 = len2 - extraBytes; i2 < len22; i2 += maxChunkLength) {
        parts.push(encodeChunk(uint8, i2, i2 + maxChunkLength > len22 ? len22 : i2 + maxChunkLength));
      }
      if (extraBytes === 1) {
        tmp = uint8[len2 - 1];
        parts.push(lookup[tmp >> 2] + lookup[tmp << 4 & 63] + "==");
      } else if (extraBytes === 2) {
        tmp = (uint8[len2 - 2] << 8) + uint8[len2 - 1];
        parts.push(lookup[tmp >> 10] + lookup[tmp >> 4 & 63] + lookup[tmp << 2 & 63] + "=");
      }
      return parts.join("");
    }
  }
});

// ../../node_modules/ieee754/index.js
var require_ieee754 = __commonJS({
  "../../node_modules/ieee754/index.js"(exports2) {
    exports2.read = function(buffer, offset, isLE, mLen, nBytes) {
      var e, m;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var nBits = -7;
      var i = isLE ? nBytes - 1 : 0;
      var d = isLE ? -1 : 1;
      var s = buffer[offset + i];
      i += d;
      e = s & (1 << -nBits) - 1;
      s >>= -nBits;
      nBits += eLen;
      for (; nBits > 0; e = e * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      m = e & (1 << -nBits) - 1;
      e >>= -nBits;
      nBits += mLen;
      for (; nBits > 0; m = m * 256 + buffer[offset + i], i += d, nBits -= 8) {
      }
      if (e === 0) {
        e = 1 - eBias;
      } else if (e === eMax) {
        return m ? NaN : (s ? -1 : 1) * Infinity;
      } else {
        m = m + Math.pow(2, mLen);
        e = e - eBias;
      }
      return (s ? -1 : 1) * m * Math.pow(2, e - mLen);
    };
    exports2.write = function(buffer, value, offset, isLE, mLen, nBytes) {
      var e, m, c;
      var eLen = nBytes * 8 - mLen - 1;
      var eMax = (1 << eLen) - 1;
      var eBias = eMax >> 1;
      var rt = mLen === 23 ? Math.pow(2, -24) - Math.pow(2, -77) : 0;
      var i = isLE ? 0 : nBytes - 1;
      var d = isLE ? 1 : -1;
      var s = value < 0 || value === 0 && 1 / value < 0 ? 1 : 0;
      value = Math.abs(value);
      if (isNaN(value) || value === Infinity) {
        m = isNaN(value) ? 1 : 0;
        e = eMax;
      } else {
        e = Math.floor(Math.log(value) / Math.LN2);
        if (value * (c = Math.pow(2, -e)) < 1) {
          e--;
          c *= 2;
        }
        if (e + eBias >= 1) {
          value += rt / c;
        } else {
          value += rt * Math.pow(2, 1 - eBias);
        }
        if (value * c >= 2) {
          e++;
          c /= 2;
        }
        if (e + eBias >= eMax) {
          m = 0;
          e = eMax;
        } else if (e + eBias >= 1) {
          m = (value * c - 1) * Math.pow(2, mLen);
          e = e + eBias;
        } else {
          m = value * Math.pow(2, eBias - 1) * Math.pow(2, mLen);
          e = 0;
        }
      }
      for (; mLen >= 8; buffer[offset + i] = m & 255, i += d, m /= 256, mLen -= 8) {
      }
      e = e << mLen | m;
      eLen += mLen;
      for (; eLen > 0; buffer[offset + i] = e & 255, i += d, e /= 256, eLen -= 8) {
      }
      buffer[offset + i - d] |= s * 128;
    };
  }
});

// ../../node_modules/ipfs-unixfs-importer/node_modules/buffer/index.js
var require_buffer = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/node_modules/buffer/index.js"(exports2) {
    "use strict";
    var base642 = require_base64_js();
    var ieee754 = require_ieee754();
    var customInspectSymbol = typeof Symbol === "function" && typeof Symbol["for"] === "function" ? Symbol["for"]("nodejs.util.inspect.custom") : null;
    exports2.Buffer = Buffer2;
    exports2.SlowBuffer = SlowBuffer;
    exports2.INSPECT_MAX_BYTES = 50;
    var K_MAX_LENGTH = 2147483647;
    exports2.kMaxLength = K_MAX_LENGTH;
    Buffer2.TYPED_ARRAY_SUPPORT = typedArraySupport();
    if (!Buffer2.TYPED_ARRAY_SUPPORT && typeof console !== "undefined" && typeof console.error === "function") {
      console.error("This browser lacks typed array (Uint8Array) support which is required by `buffer` v5.x. Use `buffer` v4.x if you require old browser support.");
    }
    function typedArraySupport() {
      try {
        const arr = new Uint8Array(1);
        const proto = { foo: function() {
          return 42;
        } };
        Object.setPrototypeOf(proto, Uint8Array.prototype);
        Object.setPrototypeOf(arr, proto);
        return arr.foo() === 42;
      } catch (e) {
        return false;
      }
    }
    Object.defineProperty(Buffer2.prototype, "parent", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.buffer;
      }
    });
    Object.defineProperty(Buffer2.prototype, "offset", {
      enumerable: true,
      get: function() {
        if (!Buffer2.isBuffer(this))
          return void 0;
        return this.byteOffset;
      }
    });
    function createBuffer(length2) {
      if (length2 > K_MAX_LENGTH) {
        throw new RangeError('The value "' + length2 + '" is invalid for option "size"');
      }
      const buf = new Uint8Array(length2);
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function Buffer2(arg, encodingOrOffset, length2) {
      if (typeof arg === "number") {
        if (typeof encodingOrOffset === "string") {
          throw new TypeError('The "string" argument must be of type string. Received type number');
        }
        return allocUnsafe(arg);
      }
      return from3(arg, encodingOrOffset, length2);
    }
    Buffer2.poolSize = 8192;
    function from3(value, encodingOrOffset, length2) {
      if (typeof value === "string") {
        return fromString3(value, encodingOrOffset);
      }
      if (ArrayBuffer.isView(value)) {
        return fromArrayView(value);
      }
      if (value == null) {
        throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
      }
      if (isInstance(value, ArrayBuffer) || value && isInstance(value.buffer, ArrayBuffer)) {
        return fromArrayBuffer(value, encodingOrOffset, length2);
      }
      if (typeof SharedArrayBuffer !== "undefined" && (isInstance(value, SharedArrayBuffer) || value && isInstance(value.buffer, SharedArrayBuffer))) {
        return fromArrayBuffer(value, encodingOrOffset, length2);
      }
      if (typeof value === "number") {
        throw new TypeError('The "value" argument must not be of type number. Received type number');
      }
      const valueOf = value.valueOf && value.valueOf();
      if (valueOf != null && valueOf !== value) {
        return Buffer2.from(valueOf, encodingOrOffset, length2);
      }
      const b = fromObject(value);
      if (b)
        return b;
      if (typeof Symbol !== "undefined" && Symbol.toPrimitive != null && typeof value[Symbol.toPrimitive] === "function") {
        return Buffer2.from(value[Symbol.toPrimitive]("string"), encodingOrOffset, length2);
      }
      throw new TypeError("The first argument must be one of type string, Buffer, ArrayBuffer, Array, or Array-like Object. Received type " + typeof value);
    }
    Buffer2.from = function(value, encodingOrOffset, length2) {
      return from3(value, encodingOrOffset, length2);
    };
    Object.setPrototypeOf(Buffer2.prototype, Uint8Array.prototype);
    Object.setPrototypeOf(Buffer2, Uint8Array);
    function assertSize(size) {
      if (typeof size !== "number") {
        throw new TypeError('"size" argument must be of type number');
      } else if (size < 0) {
        throw new RangeError('The value "' + size + '" is invalid for option "size"');
      }
    }
    function alloc(size, fill, encoding) {
      assertSize(size);
      if (size <= 0) {
        return createBuffer(size);
      }
      if (fill !== void 0) {
        return typeof encoding === "string" ? createBuffer(size).fill(fill, encoding) : createBuffer(size).fill(fill);
      }
      return createBuffer(size);
    }
    Buffer2.alloc = function(size, fill, encoding) {
      return alloc(size, fill, encoding);
    };
    function allocUnsafe(size) {
      assertSize(size);
      return createBuffer(size < 0 ? 0 : checked(size) | 0);
    }
    Buffer2.allocUnsafe = function(size) {
      return allocUnsafe(size);
    };
    Buffer2.allocUnsafeSlow = function(size) {
      return allocUnsafe(size);
    };
    function fromString3(string2, encoding) {
      if (typeof encoding !== "string" || encoding === "") {
        encoding = "utf8";
      }
      if (!Buffer2.isEncoding(encoding)) {
        throw new TypeError("Unknown encoding: " + encoding);
      }
      const length2 = byteLength(string2, encoding) | 0;
      let buf = createBuffer(length2);
      const actual = buf.write(string2, encoding);
      if (actual !== length2) {
        buf = buf.slice(0, actual);
      }
      return buf;
    }
    function fromArrayLike(array) {
      const length2 = array.length < 0 ? 0 : checked(array.length) | 0;
      const buf = createBuffer(length2);
      for (let i = 0; i < length2; i += 1) {
        buf[i] = array[i] & 255;
      }
      return buf;
    }
    function fromArrayView(arrayView) {
      if (isInstance(arrayView, Uint8Array)) {
        const copy = new Uint8Array(arrayView);
        return fromArrayBuffer(copy.buffer, copy.byteOffset, copy.byteLength);
      }
      return fromArrayLike(arrayView);
    }
    function fromArrayBuffer(array, byteOffset, length2) {
      if (byteOffset < 0 || array.byteLength < byteOffset) {
        throw new RangeError('"offset" is outside of buffer bounds');
      }
      if (array.byteLength < byteOffset + (length2 || 0)) {
        throw new RangeError('"length" is outside of buffer bounds');
      }
      let buf;
      if (byteOffset === void 0 && length2 === void 0) {
        buf = new Uint8Array(array);
      } else if (length2 === void 0) {
        buf = new Uint8Array(array, byteOffset);
      } else {
        buf = new Uint8Array(array, byteOffset, length2);
      }
      Object.setPrototypeOf(buf, Buffer2.prototype);
      return buf;
    }
    function fromObject(obj) {
      if (Buffer2.isBuffer(obj)) {
        const len = checked(obj.length) | 0;
        const buf = createBuffer(len);
        if (buf.length === 0) {
          return buf;
        }
        obj.copy(buf, 0, 0, len);
        return buf;
      }
      if (obj.length !== void 0) {
        if (typeof obj.length !== "number" || numberIsNaN(obj.length)) {
          return createBuffer(0);
        }
        return fromArrayLike(obj);
      }
      if (obj.type === "Buffer" && Array.isArray(obj.data)) {
        return fromArrayLike(obj.data);
      }
    }
    function checked(length2) {
      if (length2 >= K_MAX_LENGTH) {
        throw new RangeError("Attempt to allocate Buffer larger than maximum size: 0x" + K_MAX_LENGTH.toString(16) + " bytes");
      }
      return length2 | 0;
    }
    function SlowBuffer(length2) {
      if (+length2 != length2) {
        length2 = 0;
      }
      return Buffer2.alloc(+length2);
    }
    Buffer2.isBuffer = function isBuffer(b) {
      return b != null && b._isBuffer === true && b !== Buffer2.prototype;
    };
    Buffer2.compare = function compare(a, b) {
      if (isInstance(a, Uint8Array))
        a = Buffer2.from(a, a.offset, a.byteLength);
      if (isInstance(b, Uint8Array))
        b = Buffer2.from(b, b.offset, b.byteLength);
      if (!Buffer2.isBuffer(a) || !Buffer2.isBuffer(b)) {
        throw new TypeError('The "buf1", "buf2" arguments must be one of type Buffer or Uint8Array');
      }
      if (a === b)
        return 0;
      let x = a.length;
      let y = b.length;
      for (let i = 0, len = Math.min(x, y); i < len; ++i) {
        if (a[i] !== b[i]) {
          x = a[i];
          y = b[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    Buffer2.isEncoding = function isEncoding(encoding) {
      switch (String(encoding).toLowerCase()) {
        case "hex":
        case "utf8":
        case "utf-8":
        case "ascii":
        case "latin1":
        case "binary":
        case "base64":
        case "ucs2":
        case "ucs-2":
        case "utf16le":
        case "utf-16le":
          return true;
        default:
          return false;
      }
    };
    Buffer2.concat = function concat2(list, length2) {
      if (!Array.isArray(list)) {
        throw new TypeError('"list" argument must be an Array of Buffers');
      }
      if (list.length === 0) {
        return Buffer2.alloc(0);
      }
      let i;
      if (length2 === void 0) {
        length2 = 0;
        for (i = 0; i < list.length; ++i) {
          length2 += list[i].length;
        }
      }
      const buffer = Buffer2.allocUnsafe(length2);
      let pos = 0;
      for (i = 0; i < list.length; ++i) {
        let buf = list[i];
        if (isInstance(buf, Uint8Array)) {
          if (pos + buf.length > buffer.length) {
            if (!Buffer2.isBuffer(buf))
              buf = Buffer2.from(buf);
            buf.copy(buffer, pos);
          } else {
            Uint8Array.prototype.set.call(buffer, buf, pos);
          }
        } else if (!Buffer2.isBuffer(buf)) {
          throw new TypeError('"list" argument must be an Array of Buffers');
        } else {
          buf.copy(buffer, pos);
        }
        pos += buf.length;
      }
      return buffer;
    };
    function byteLength(string2, encoding) {
      if (Buffer2.isBuffer(string2)) {
        return string2.length;
      }
      if (ArrayBuffer.isView(string2) || isInstance(string2, ArrayBuffer)) {
        return string2.byteLength;
      }
      if (typeof string2 !== "string") {
        throw new TypeError('The "string" argument must be one of type string, Buffer, or ArrayBuffer. Received type ' + typeof string2);
      }
      const len = string2.length;
      const mustMatch = arguments.length > 2 && arguments[2] === true;
      if (!mustMatch && len === 0)
        return 0;
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "ascii":
          case "latin1":
          case "binary":
            return len;
          case "utf8":
          case "utf-8":
            return utf8ToBytes(string2).length;
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return len * 2;
          case "hex":
            return len >>> 1;
          case "base64":
            return base64ToBytes(string2).length;
          default:
            if (loweredCase) {
              return mustMatch ? -1 : utf8ToBytes(string2).length;
            }
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.byteLength = byteLength;
    function slowToString(encoding, start, end) {
      let loweredCase = false;
      if (start === void 0 || start < 0) {
        start = 0;
      }
      if (start > this.length) {
        return "";
      }
      if (end === void 0 || end > this.length) {
        end = this.length;
      }
      if (end <= 0) {
        return "";
      }
      end >>>= 0;
      start >>>= 0;
      if (end <= start) {
        return "";
      }
      if (!encoding)
        encoding = "utf8";
      while (true) {
        switch (encoding) {
          case "hex":
            return hexSlice(this, start, end);
          case "utf8":
          case "utf-8":
            return utf8Slice(this, start, end);
          case "ascii":
            return asciiSlice(this, start, end);
          case "latin1":
          case "binary":
            return latin1Slice(this, start, end);
          case "base64":
            return base64Slice(this, start, end);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return utf16leSlice(this, start, end);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = (encoding + "").toLowerCase();
            loweredCase = true;
        }
      }
    }
    Buffer2.prototype._isBuffer = true;
    function swap(b, n, m) {
      const i = b[n];
      b[n] = b[m];
      b[m] = i;
    }
    Buffer2.prototype.swap16 = function swap16() {
      const len = this.length;
      if (len % 2 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 16-bits");
      }
      for (let i = 0; i < len; i += 2) {
        swap(this, i, i + 1);
      }
      return this;
    };
    Buffer2.prototype.swap32 = function swap32() {
      const len = this.length;
      if (len % 4 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 32-bits");
      }
      for (let i = 0; i < len; i += 4) {
        swap(this, i, i + 3);
        swap(this, i + 1, i + 2);
      }
      return this;
    };
    Buffer2.prototype.swap64 = function swap64() {
      const len = this.length;
      if (len % 8 !== 0) {
        throw new RangeError("Buffer size must be a multiple of 64-bits");
      }
      for (let i = 0; i < len; i += 8) {
        swap(this, i, i + 7);
        swap(this, i + 1, i + 6);
        swap(this, i + 2, i + 5);
        swap(this, i + 3, i + 4);
      }
      return this;
    };
    Buffer2.prototype.toString = function toString3() {
      const length2 = this.length;
      if (length2 === 0)
        return "";
      if (arguments.length === 0)
        return utf8Slice(this, 0, length2);
      return slowToString.apply(this, arguments);
    };
    Buffer2.prototype.toLocaleString = Buffer2.prototype.toString;
    Buffer2.prototype.equals = function equals4(b) {
      if (!Buffer2.isBuffer(b))
        throw new TypeError("Argument must be a Buffer");
      if (this === b)
        return true;
      return Buffer2.compare(this, b) === 0;
    };
    Buffer2.prototype.inspect = function inspect() {
      let str = "";
      const max = exports2.INSPECT_MAX_BYTES;
      str = this.toString("hex", 0, max).replace(/(.{2})/g, "$1 ").trim();
      if (this.length > max)
        str += " ... ";
      return "<Buffer " + str + ">";
    };
    if (customInspectSymbol) {
      Buffer2.prototype[customInspectSymbol] = Buffer2.prototype.inspect;
    }
    Buffer2.prototype.compare = function compare(target, start, end, thisStart, thisEnd) {
      if (isInstance(target, Uint8Array)) {
        target = Buffer2.from(target, target.offset, target.byteLength);
      }
      if (!Buffer2.isBuffer(target)) {
        throw new TypeError('The "target" argument must be one of type Buffer or Uint8Array. Received type ' + typeof target);
      }
      if (start === void 0) {
        start = 0;
      }
      if (end === void 0) {
        end = target ? target.length : 0;
      }
      if (thisStart === void 0) {
        thisStart = 0;
      }
      if (thisEnd === void 0) {
        thisEnd = this.length;
      }
      if (start < 0 || end > target.length || thisStart < 0 || thisEnd > this.length) {
        throw new RangeError("out of range index");
      }
      if (thisStart >= thisEnd && start >= end) {
        return 0;
      }
      if (thisStart >= thisEnd) {
        return -1;
      }
      if (start >= end) {
        return 1;
      }
      start >>>= 0;
      end >>>= 0;
      thisStart >>>= 0;
      thisEnd >>>= 0;
      if (this === target)
        return 0;
      let x = thisEnd - thisStart;
      let y = end - start;
      const len = Math.min(x, y);
      const thisCopy = this.slice(thisStart, thisEnd);
      const targetCopy = target.slice(start, end);
      for (let i = 0; i < len; ++i) {
        if (thisCopy[i] !== targetCopy[i]) {
          x = thisCopy[i];
          y = targetCopy[i];
          break;
        }
      }
      if (x < y)
        return -1;
      if (y < x)
        return 1;
      return 0;
    };
    function bidirectionalIndexOf(buffer, val, byteOffset, encoding, dir) {
      if (buffer.length === 0)
        return -1;
      if (typeof byteOffset === "string") {
        encoding = byteOffset;
        byteOffset = 0;
      } else if (byteOffset > 2147483647) {
        byteOffset = 2147483647;
      } else if (byteOffset < -2147483648) {
        byteOffset = -2147483648;
      }
      byteOffset = +byteOffset;
      if (numberIsNaN(byteOffset)) {
        byteOffset = dir ? 0 : buffer.length - 1;
      }
      if (byteOffset < 0)
        byteOffset = buffer.length + byteOffset;
      if (byteOffset >= buffer.length) {
        if (dir)
          return -1;
        else
          byteOffset = buffer.length - 1;
      } else if (byteOffset < 0) {
        if (dir)
          byteOffset = 0;
        else
          return -1;
      }
      if (typeof val === "string") {
        val = Buffer2.from(val, encoding);
      }
      if (Buffer2.isBuffer(val)) {
        if (val.length === 0) {
          return -1;
        }
        return arrayIndexOf(buffer, val, byteOffset, encoding, dir);
      } else if (typeof val === "number") {
        val = val & 255;
        if (typeof Uint8Array.prototype.indexOf === "function") {
          if (dir) {
            return Uint8Array.prototype.indexOf.call(buffer, val, byteOffset);
          } else {
            return Uint8Array.prototype.lastIndexOf.call(buffer, val, byteOffset);
          }
        }
        return arrayIndexOf(buffer, [val], byteOffset, encoding, dir);
      }
      throw new TypeError("val must be string, number or Buffer");
    }
    function arrayIndexOf(arr, val, byteOffset, encoding, dir) {
      let indexSize = 1;
      let arrLength = arr.length;
      let valLength = val.length;
      if (encoding !== void 0) {
        encoding = String(encoding).toLowerCase();
        if (encoding === "ucs2" || encoding === "ucs-2" || encoding === "utf16le" || encoding === "utf-16le") {
          if (arr.length < 2 || val.length < 2) {
            return -1;
          }
          indexSize = 2;
          arrLength /= 2;
          valLength /= 2;
          byteOffset /= 2;
        }
      }
      function read2(buf, i2) {
        if (indexSize === 1) {
          return buf[i2];
        } else {
          return buf.readUInt16BE(i2 * indexSize);
        }
      }
      let i;
      if (dir) {
        let foundIndex = -1;
        for (i = byteOffset; i < arrLength; i++) {
          if (read2(arr, i) === read2(val, foundIndex === -1 ? 0 : i - foundIndex)) {
            if (foundIndex === -1)
              foundIndex = i;
            if (i - foundIndex + 1 === valLength)
              return foundIndex * indexSize;
          } else {
            if (foundIndex !== -1)
              i -= i - foundIndex;
            foundIndex = -1;
          }
        }
      } else {
        if (byteOffset + valLength > arrLength)
          byteOffset = arrLength - valLength;
        for (i = byteOffset; i >= 0; i--) {
          let found = true;
          for (let j = 0; j < valLength; j++) {
            if (read2(arr, i + j) !== read2(val, j)) {
              found = false;
              break;
            }
          }
          if (found)
            return i;
        }
      }
      return -1;
    }
    Buffer2.prototype.includes = function includes(val, byteOffset, encoding) {
      return this.indexOf(val, byteOffset, encoding) !== -1;
    };
    Buffer2.prototype.indexOf = function indexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, true);
    };
    Buffer2.prototype.lastIndexOf = function lastIndexOf(val, byteOffset, encoding) {
      return bidirectionalIndexOf(this, val, byteOffset, encoding, false);
    };
    function hexWrite(buf, string2, offset, length2) {
      offset = Number(offset) || 0;
      const remaining = buf.length - offset;
      if (!length2) {
        length2 = remaining;
      } else {
        length2 = Number(length2);
        if (length2 > remaining) {
          length2 = remaining;
        }
      }
      const strLen = string2.length;
      if (length2 > strLen / 2) {
        length2 = strLen / 2;
      }
      let i;
      for (i = 0; i < length2; ++i) {
        const parsed = parseInt(string2.substr(i * 2, 2), 16);
        if (numberIsNaN(parsed))
          return i;
        buf[offset + i] = parsed;
      }
      return i;
    }
    function utf8Write(buf, string2, offset, length2) {
      return blitBuffer(utf8ToBytes(string2, buf.length - offset), buf, offset, length2);
    }
    function asciiWrite(buf, string2, offset, length2) {
      return blitBuffer(asciiToBytes(string2), buf, offset, length2);
    }
    function base64Write(buf, string2, offset, length2) {
      return blitBuffer(base64ToBytes(string2), buf, offset, length2);
    }
    function ucs2Write(buf, string2, offset, length2) {
      return blitBuffer(utf16leToBytes(string2, buf.length - offset), buf, offset, length2);
    }
    Buffer2.prototype.write = function write(string2, offset, length2, encoding) {
      if (offset === void 0) {
        encoding = "utf8";
        length2 = this.length;
        offset = 0;
      } else if (length2 === void 0 && typeof offset === "string") {
        encoding = offset;
        length2 = this.length;
        offset = 0;
      } else if (isFinite(offset)) {
        offset = offset >>> 0;
        if (isFinite(length2)) {
          length2 = length2 >>> 0;
          if (encoding === void 0)
            encoding = "utf8";
        } else {
          encoding = length2;
          length2 = void 0;
        }
      } else {
        throw new Error("Buffer.write(string, encoding, offset[, length]) is no longer supported");
      }
      const remaining = this.length - offset;
      if (length2 === void 0 || length2 > remaining)
        length2 = remaining;
      if (string2.length > 0 && (length2 < 0 || offset < 0) || offset > this.length) {
        throw new RangeError("Attempt to write outside buffer bounds");
      }
      if (!encoding)
        encoding = "utf8";
      let loweredCase = false;
      for (; ; ) {
        switch (encoding) {
          case "hex":
            return hexWrite(this, string2, offset, length2);
          case "utf8":
          case "utf-8":
            return utf8Write(this, string2, offset, length2);
          case "ascii":
          case "latin1":
          case "binary":
            return asciiWrite(this, string2, offset, length2);
          case "base64":
            return base64Write(this, string2, offset, length2);
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return ucs2Write(this, string2, offset, length2);
          default:
            if (loweredCase)
              throw new TypeError("Unknown encoding: " + encoding);
            encoding = ("" + encoding).toLowerCase();
            loweredCase = true;
        }
      }
    };
    Buffer2.prototype.toJSON = function toJSON() {
      return {
        type: "Buffer",
        data: Array.prototype.slice.call(this._arr || this, 0)
      };
    };
    function base64Slice(buf, start, end) {
      if (start === 0 && end === buf.length) {
        return base642.fromByteArray(buf);
      } else {
        return base642.fromByteArray(buf.slice(start, end));
      }
    }
    function utf8Slice(buf, start, end) {
      end = Math.min(buf.length, end);
      const res = [];
      let i = start;
      while (i < end) {
        const firstByte = buf[i];
        let codePoint = null;
        let bytesPerSequence = firstByte > 239 ? 4 : firstByte > 223 ? 3 : firstByte > 191 ? 2 : 1;
        if (i + bytesPerSequence <= end) {
          let secondByte, thirdByte, fourthByte, tempCodePoint;
          switch (bytesPerSequence) {
            case 1:
              if (firstByte < 128) {
                codePoint = firstByte;
              }
              break;
            case 2:
              secondByte = buf[i + 1];
              if ((secondByte & 192) === 128) {
                tempCodePoint = (firstByte & 31) << 6 | secondByte & 63;
                if (tempCodePoint > 127) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 3:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 12 | (secondByte & 63) << 6 | thirdByte & 63;
                if (tempCodePoint > 2047 && (tempCodePoint < 55296 || tempCodePoint > 57343)) {
                  codePoint = tempCodePoint;
                }
              }
              break;
            case 4:
              secondByte = buf[i + 1];
              thirdByte = buf[i + 2];
              fourthByte = buf[i + 3];
              if ((secondByte & 192) === 128 && (thirdByte & 192) === 128 && (fourthByte & 192) === 128) {
                tempCodePoint = (firstByte & 15) << 18 | (secondByte & 63) << 12 | (thirdByte & 63) << 6 | fourthByte & 63;
                if (tempCodePoint > 65535 && tempCodePoint < 1114112) {
                  codePoint = tempCodePoint;
                }
              }
          }
        }
        if (codePoint === null) {
          codePoint = 65533;
          bytesPerSequence = 1;
        } else if (codePoint > 65535) {
          codePoint -= 65536;
          res.push(codePoint >>> 10 & 1023 | 55296);
          codePoint = 56320 | codePoint & 1023;
        }
        res.push(codePoint);
        i += bytesPerSequence;
      }
      return decodeCodePointsArray(res);
    }
    var MAX_ARGUMENTS_LENGTH = 4096;
    function decodeCodePointsArray(codePoints) {
      const len = codePoints.length;
      if (len <= MAX_ARGUMENTS_LENGTH) {
        return String.fromCharCode.apply(String, codePoints);
      }
      let res = "";
      let i = 0;
      while (i < len) {
        res += String.fromCharCode.apply(String, codePoints.slice(i, i += MAX_ARGUMENTS_LENGTH));
      }
      return res;
    }
    function asciiSlice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i] & 127);
      }
      return ret;
    }
    function latin1Slice(buf, start, end) {
      let ret = "";
      end = Math.min(buf.length, end);
      for (let i = start; i < end; ++i) {
        ret += String.fromCharCode(buf[i]);
      }
      return ret;
    }
    function hexSlice(buf, start, end) {
      const len = buf.length;
      if (!start || start < 0)
        start = 0;
      if (!end || end < 0 || end > len)
        end = len;
      let out = "";
      for (let i = start; i < end; ++i) {
        out += hexSliceLookupTable[buf[i]];
      }
      return out;
    }
    function utf16leSlice(buf, start, end) {
      const bytes = buf.slice(start, end);
      let res = "";
      for (let i = 0; i < bytes.length - 1; i += 2) {
        res += String.fromCharCode(bytes[i] + bytes[i + 1] * 256);
      }
      return res;
    }
    Buffer2.prototype.slice = function slice(start, end) {
      const len = this.length;
      start = ~~start;
      end = end === void 0 ? len : ~~end;
      if (start < 0) {
        start += len;
        if (start < 0)
          start = 0;
      } else if (start > len) {
        start = len;
      }
      if (end < 0) {
        end += len;
        if (end < 0)
          end = 0;
      } else if (end > len) {
        end = len;
      }
      if (end < start)
        end = start;
      const newBuf = this.subarray(start, end);
      Object.setPrototypeOf(newBuf, Buffer2.prototype);
      return newBuf;
    };
    function checkOffset(offset, ext, length2) {
      if (offset % 1 !== 0 || offset < 0)
        throw new RangeError("offset is not uint");
      if (offset + ext > length2)
        throw new RangeError("Trying to access beyond buffer length");
    }
    Buffer2.prototype.readUintLE = Buffer2.prototype.readUIntLE = function readUIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUintBE = Buffer2.prototype.readUIntBE = function readUIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        checkOffset(offset, byteLength2, this.length);
      }
      let val = this[offset + --byteLength2];
      let mul = 1;
      while (byteLength2 > 0 && (mul *= 256)) {
        val += this[offset + --byteLength2] * mul;
      }
      return val;
    };
    Buffer2.prototype.readUint8 = Buffer2.prototype.readUInt8 = function readUInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      return this[offset];
    };
    Buffer2.prototype.readUint16LE = Buffer2.prototype.readUInt16LE = function readUInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] | this[offset + 1] << 8;
    };
    Buffer2.prototype.readUint16BE = Buffer2.prototype.readUInt16BE = function readUInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      return this[offset] << 8 | this[offset + 1];
    };
    Buffer2.prototype.readUint32LE = Buffer2.prototype.readUInt32LE = function readUInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return (this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16) + this[offset + 3] * 16777216;
    };
    Buffer2.prototype.readUint32BE = Buffer2.prototype.readUInt32BE = function readUInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] * 16777216 + (this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3]);
    };
    Buffer2.prototype.readBigUInt64LE = defineBigIntMethod(function readBigUInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const lo = first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24;
      const hi = this[++offset] + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + last * 2 ** 24;
      return BigInt(lo) + (BigInt(hi) << BigInt(32));
    });
    Buffer2.prototype.readBigUInt64BE = defineBigIntMethod(function readBigUInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const hi = first * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      const lo = this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last;
      return (BigInt(hi) << BigInt(32)) + BigInt(lo);
    });
    Buffer2.prototype.readIntLE = function readIntLE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let val = this[offset];
      let mul = 1;
      let i = 0;
      while (++i < byteLength2 && (mul *= 256)) {
        val += this[offset + i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readIntBE = function readIntBE(offset, byteLength2, noAssert) {
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert)
        checkOffset(offset, byteLength2, this.length);
      let i = byteLength2;
      let mul = 1;
      let val = this[offset + --i];
      while (i > 0 && (mul *= 256)) {
        val += this[offset + --i] * mul;
      }
      mul *= 128;
      if (val >= mul)
        val -= Math.pow(2, 8 * byteLength2);
      return val;
    };
    Buffer2.prototype.readInt8 = function readInt8(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 1, this.length);
      if (!(this[offset] & 128))
        return this[offset];
      return (255 - this[offset] + 1) * -1;
    };
    Buffer2.prototype.readInt16LE = function readInt16LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset] | this[offset + 1] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt16BE = function readInt16BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 2, this.length);
      const val = this[offset + 1] | this[offset] << 8;
      return val & 32768 ? val | 4294901760 : val;
    };
    Buffer2.prototype.readInt32LE = function readInt32LE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] | this[offset + 1] << 8 | this[offset + 2] << 16 | this[offset + 3] << 24;
    };
    Buffer2.prototype.readInt32BE = function readInt32BE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return this[offset] << 24 | this[offset + 1] << 16 | this[offset + 2] << 8 | this[offset + 3];
    };
    Buffer2.prototype.readBigInt64LE = defineBigIntMethod(function readBigInt64LE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = this[offset + 4] + this[offset + 5] * 2 ** 8 + this[offset + 6] * 2 ** 16 + (last << 24);
      return (BigInt(val) << BigInt(32)) + BigInt(first + this[++offset] * 2 ** 8 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 24);
    });
    Buffer2.prototype.readBigInt64BE = defineBigIntMethod(function readBigInt64BE(offset) {
      offset = offset >>> 0;
      validateNumber(offset, "offset");
      const first = this[offset];
      const last = this[offset + 7];
      if (first === void 0 || last === void 0) {
        boundsError(offset, this.length - 8);
      }
      const val = (first << 24) + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + this[++offset];
      return (BigInt(val) << BigInt(32)) + BigInt(this[++offset] * 2 ** 24 + this[++offset] * 2 ** 16 + this[++offset] * 2 ** 8 + last);
    });
    Buffer2.prototype.readFloatLE = function readFloatLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, true, 23, 4);
    };
    Buffer2.prototype.readFloatBE = function readFloatBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 4, this.length);
      return ieee754.read(this, offset, false, 23, 4);
    };
    Buffer2.prototype.readDoubleLE = function readDoubleLE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, true, 52, 8);
    };
    Buffer2.prototype.readDoubleBE = function readDoubleBE(offset, noAssert) {
      offset = offset >>> 0;
      if (!noAssert)
        checkOffset(offset, 8, this.length);
      return ieee754.read(this, offset, false, 52, 8);
    };
    function checkInt(buf, value, offset, ext, max, min) {
      if (!Buffer2.isBuffer(buf))
        throw new TypeError('"buffer" argument must be a Buffer instance');
      if (value > max || value < min)
        throw new RangeError('"value" argument is out of bounds');
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
    }
    Buffer2.prototype.writeUintLE = Buffer2.prototype.writeUIntLE = function writeUIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let mul = 1;
      let i = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUintBE = Buffer2.prototype.writeUIntBE = function writeUIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      byteLength2 = byteLength2 >>> 0;
      if (!noAssert) {
        const maxBytes = Math.pow(2, 8 * byteLength2) - 1;
        checkInt(this, value, offset, byteLength2, maxBytes, 0);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        this[offset + i] = value / mul & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeUint8 = Buffer2.prototype.writeUInt8 = function writeUInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 255, 0);
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeUint16LE = Buffer2.prototype.writeUInt16LE = function writeUInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeUint16BE = Buffer2.prototype.writeUInt16BE = function writeUInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 65535, 0);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeUint32LE = Buffer2.prototype.writeUInt32LE = function writeUInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset + 3] = value >>> 24;
      this[offset + 2] = value >>> 16;
      this[offset + 1] = value >>> 8;
      this[offset] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeUint32BE = Buffer2.prototype.writeUInt32BE = function writeUInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 4294967295, 0);
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    function wrtBigUInt64LE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      lo = lo >> 8;
      buf[offset++] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      hi = hi >> 8;
      buf[offset++] = hi;
      return offset;
    }
    function wrtBigUInt64BE(buf, value, offset, min, max) {
      checkIntBI(value, min, max, buf, offset, 7);
      let lo = Number(value & BigInt(4294967295));
      buf[offset + 7] = lo;
      lo = lo >> 8;
      buf[offset + 6] = lo;
      lo = lo >> 8;
      buf[offset + 5] = lo;
      lo = lo >> 8;
      buf[offset + 4] = lo;
      let hi = Number(value >> BigInt(32) & BigInt(4294967295));
      buf[offset + 3] = hi;
      hi = hi >> 8;
      buf[offset + 2] = hi;
      hi = hi >> 8;
      buf[offset + 1] = hi;
      hi = hi >> 8;
      buf[offset] = hi;
      return offset + 8;
    }
    Buffer2.prototype.writeBigUInt64LE = defineBigIntMethod(function writeBigUInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeBigUInt64BE = defineBigIntMethod(function writeBigUInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, BigInt(0), BigInt("0xffffffffffffffff"));
    });
    Buffer2.prototype.writeIntLE = function writeIntLE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = 0;
      let mul = 1;
      let sub = 0;
      this[offset] = value & 255;
      while (++i < byteLength2 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i - 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeIntBE = function writeIntBE(value, offset, byteLength2, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        const limit = Math.pow(2, 8 * byteLength2 - 1);
        checkInt(this, value, offset, byteLength2, limit - 1, -limit);
      }
      let i = byteLength2 - 1;
      let mul = 1;
      let sub = 0;
      this[offset + i] = value & 255;
      while (--i >= 0 && (mul *= 256)) {
        if (value < 0 && sub === 0 && this[offset + i + 1] !== 0) {
          sub = 1;
        }
        this[offset + i] = (value / mul >> 0) - sub & 255;
      }
      return offset + byteLength2;
    };
    Buffer2.prototype.writeInt8 = function writeInt8(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 1, 127, -128);
      if (value < 0)
        value = 255 + value + 1;
      this[offset] = value & 255;
      return offset + 1;
    };
    Buffer2.prototype.writeInt16LE = function writeInt16LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      return offset + 2;
    };
    Buffer2.prototype.writeInt16BE = function writeInt16BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 2, 32767, -32768);
      this[offset] = value >>> 8;
      this[offset + 1] = value & 255;
      return offset + 2;
    };
    Buffer2.prototype.writeInt32LE = function writeInt32LE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      this[offset] = value & 255;
      this[offset + 1] = value >>> 8;
      this[offset + 2] = value >>> 16;
      this[offset + 3] = value >>> 24;
      return offset + 4;
    };
    Buffer2.prototype.writeInt32BE = function writeInt32BE(value, offset, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert)
        checkInt(this, value, offset, 4, 2147483647, -2147483648);
      if (value < 0)
        value = 4294967295 + value + 1;
      this[offset] = value >>> 24;
      this[offset + 1] = value >>> 16;
      this[offset + 2] = value >>> 8;
      this[offset + 3] = value & 255;
      return offset + 4;
    };
    Buffer2.prototype.writeBigInt64LE = defineBigIntMethod(function writeBigInt64LE(value, offset = 0) {
      return wrtBigUInt64LE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    Buffer2.prototype.writeBigInt64BE = defineBigIntMethod(function writeBigInt64BE(value, offset = 0) {
      return wrtBigUInt64BE(this, value, offset, -BigInt("0x8000000000000000"), BigInt("0x7fffffffffffffff"));
    });
    function checkIEEE754(buf, value, offset, ext, max, min) {
      if (offset + ext > buf.length)
        throw new RangeError("Index out of range");
      if (offset < 0)
        throw new RangeError("Index out of range");
    }
    function writeFloat(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 4, 34028234663852886e22, -34028234663852886e22);
      }
      ieee754.write(buf, value, offset, littleEndian, 23, 4);
      return offset + 4;
    }
    Buffer2.prototype.writeFloatLE = function writeFloatLE(value, offset, noAssert) {
      return writeFloat(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeFloatBE = function writeFloatBE(value, offset, noAssert) {
      return writeFloat(this, value, offset, false, noAssert);
    };
    function writeDouble(buf, value, offset, littleEndian, noAssert) {
      value = +value;
      offset = offset >>> 0;
      if (!noAssert) {
        checkIEEE754(buf, value, offset, 8, 17976931348623157e292, -17976931348623157e292);
      }
      ieee754.write(buf, value, offset, littleEndian, 52, 8);
      return offset + 8;
    }
    Buffer2.prototype.writeDoubleLE = function writeDoubleLE(value, offset, noAssert) {
      return writeDouble(this, value, offset, true, noAssert);
    };
    Buffer2.prototype.writeDoubleBE = function writeDoubleBE(value, offset, noAssert) {
      return writeDouble(this, value, offset, false, noAssert);
    };
    Buffer2.prototype.copy = function copy(target, targetStart, start, end) {
      if (!Buffer2.isBuffer(target))
        throw new TypeError("argument should be a Buffer");
      if (!start)
        start = 0;
      if (!end && end !== 0)
        end = this.length;
      if (targetStart >= target.length)
        targetStart = target.length;
      if (!targetStart)
        targetStart = 0;
      if (end > 0 && end < start)
        end = start;
      if (end === start)
        return 0;
      if (target.length === 0 || this.length === 0)
        return 0;
      if (targetStart < 0) {
        throw new RangeError("targetStart out of bounds");
      }
      if (start < 0 || start >= this.length)
        throw new RangeError("Index out of range");
      if (end < 0)
        throw new RangeError("sourceEnd out of bounds");
      if (end > this.length)
        end = this.length;
      if (target.length - targetStart < end - start) {
        end = target.length - targetStart + start;
      }
      const len = end - start;
      if (this === target && typeof Uint8Array.prototype.copyWithin === "function") {
        this.copyWithin(targetStart, start, end);
      } else {
        Uint8Array.prototype.set.call(target, this.subarray(start, end), targetStart);
      }
      return len;
    };
    Buffer2.prototype.fill = function fill(val, start, end, encoding) {
      if (typeof val === "string") {
        if (typeof start === "string") {
          encoding = start;
          start = 0;
          end = this.length;
        } else if (typeof end === "string") {
          encoding = end;
          end = this.length;
        }
        if (encoding !== void 0 && typeof encoding !== "string") {
          throw new TypeError("encoding must be a string");
        }
        if (typeof encoding === "string" && !Buffer2.isEncoding(encoding)) {
          throw new TypeError("Unknown encoding: " + encoding);
        }
        if (val.length === 1) {
          const code3 = val.charCodeAt(0);
          if (encoding === "utf8" && code3 < 128 || encoding === "latin1") {
            val = code3;
          }
        }
      } else if (typeof val === "number") {
        val = val & 255;
      } else if (typeof val === "boolean") {
        val = Number(val);
      }
      if (start < 0 || this.length < start || this.length < end) {
        throw new RangeError("Out of range index");
      }
      if (end <= start) {
        return this;
      }
      start = start >>> 0;
      end = end === void 0 ? this.length : end >>> 0;
      if (!val)
        val = 0;
      let i;
      if (typeof val === "number") {
        for (i = start; i < end; ++i) {
          this[i] = val;
        }
      } else {
        const bytes = Buffer2.isBuffer(val) ? val : Buffer2.from(val, encoding);
        const len = bytes.length;
        if (len === 0) {
          throw new TypeError('The value "' + val + '" is invalid for argument "value"');
        }
        for (i = 0; i < end - start; ++i) {
          this[i + start] = bytes[i % len];
        }
      }
      return this;
    };
    var errors = {};
    function E(sym, getMessage, Base) {
      errors[sym] = class NodeError extends Base {
        constructor() {
          super();
          Object.defineProperty(this, "message", {
            value: getMessage.apply(this, arguments),
            writable: true,
            configurable: true
          });
          this.name = `${this.name} [${sym}]`;
          this.stack;
          delete this.name;
        }
        get code() {
          return sym;
        }
        set code(value) {
          Object.defineProperty(this, "code", {
            configurable: true,
            enumerable: true,
            value,
            writable: true
          });
        }
        toString() {
          return `${this.name} [${sym}]: ${this.message}`;
        }
      };
    }
    E("ERR_BUFFER_OUT_OF_BOUNDS", function(name3) {
      if (name3) {
        return `${name3} is outside of buffer bounds`;
      }
      return "Attempt to access memory outside buffer bounds";
    }, RangeError);
    E("ERR_INVALID_ARG_TYPE", function(name3, actual) {
      return `The "${name3}" argument must be of type number. Received type ${typeof actual}`;
    }, TypeError);
    E("ERR_OUT_OF_RANGE", function(str, range, input) {
      let msg = `The value of "${str}" is out of range.`;
      let received = input;
      if (Number.isInteger(input) && Math.abs(input) > 2 ** 32) {
        received = addNumericalSeparator(String(input));
      } else if (typeof input === "bigint") {
        received = String(input);
        if (input > BigInt(2) ** BigInt(32) || input < -(BigInt(2) ** BigInt(32))) {
          received = addNumericalSeparator(received);
        }
        received += "n";
      }
      msg += ` It must be ${range}. Received ${received}`;
      return msg;
    }, RangeError);
    function addNumericalSeparator(val) {
      let res = "";
      let i = val.length;
      const start = val[0] === "-" ? 1 : 0;
      for (; i >= start + 4; i -= 3) {
        res = `_${val.slice(i - 3, i)}${res}`;
      }
      return `${val.slice(0, i)}${res}`;
    }
    function checkBounds(buf, offset, byteLength2) {
      validateNumber(offset, "offset");
      if (buf[offset] === void 0 || buf[offset + byteLength2] === void 0) {
        boundsError(offset, buf.length - (byteLength2 + 1));
      }
    }
    function checkIntBI(value, min, max, buf, offset, byteLength2) {
      if (value > max || value < min) {
        const n = typeof min === "bigint" ? "n" : "";
        let range;
        if (byteLength2 > 3) {
          if (min === 0 || min === BigInt(0)) {
            range = `>= 0${n} and < 2${n} ** ${(byteLength2 + 1) * 8}${n}`;
          } else {
            range = `>= -(2${n} ** ${(byteLength2 + 1) * 8 - 1}${n}) and < 2 ** ${(byteLength2 + 1) * 8 - 1}${n}`;
          }
        } else {
          range = `>= ${min}${n} and <= ${max}${n}`;
        }
        throw new errors.ERR_OUT_OF_RANGE("value", range, value);
      }
      checkBounds(buf, offset, byteLength2);
    }
    function validateNumber(value, name3) {
      if (typeof value !== "number") {
        throw new errors.ERR_INVALID_ARG_TYPE(name3, "number", value);
      }
    }
    function boundsError(value, length2, type) {
      if (Math.floor(value) !== value) {
        validateNumber(value, type);
        throw new errors.ERR_OUT_OF_RANGE(type || "offset", "an integer", value);
      }
      if (length2 < 0) {
        throw new errors.ERR_BUFFER_OUT_OF_BOUNDS();
      }
      throw new errors.ERR_OUT_OF_RANGE(type || "offset", `>= ${type ? 1 : 0} and <= ${length2}`, value);
    }
    var INVALID_BASE64_RE = /[^+/0-9A-Za-z-_]/g;
    function base64clean(str) {
      str = str.split("=")[0];
      str = str.trim().replace(INVALID_BASE64_RE, "");
      if (str.length < 2)
        return "";
      while (str.length % 4 !== 0) {
        str = str + "=";
      }
      return str;
    }
    function utf8ToBytes(string2, units) {
      units = units || Infinity;
      let codePoint;
      const length2 = string2.length;
      let leadSurrogate = null;
      const bytes = [];
      for (let i = 0; i < length2; ++i) {
        codePoint = string2.charCodeAt(i);
        if (codePoint > 55295 && codePoint < 57344) {
          if (!leadSurrogate) {
            if (codePoint > 56319) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            } else if (i + 1 === length2) {
              if ((units -= 3) > -1)
                bytes.push(239, 191, 189);
              continue;
            }
            leadSurrogate = codePoint;
            continue;
          }
          if (codePoint < 56320) {
            if ((units -= 3) > -1)
              bytes.push(239, 191, 189);
            leadSurrogate = codePoint;
            continue;
          }
          codePoint = (leadSurrogate - 55296 << 10 | codePoint - 56320) + 65536;
        } else if (leadSurrogate) {
          if ((units -= 3) > -1)
            bytes.push(239, 191, 189);
        }
        leadSurrogate = null;
        if (codePoint < 128) {
          if ((units -= 1) < 0)
            break;
          bytes.push(codePoint);
        } else if (codePoint < 2048) {
          if ((units -= 2) < 0)
            break;
          bytes.push(codePoint >> 6 | 192, codePoint & 63 | 128);
        } else if (codePoint < 65536) {
          if ((units -= 3) < 0)
            break;
          bytes.push(codePoint >> 12 | 224, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else if (codePoint < 1114112) {
          if ((units -= 4) < 0)
            break;
          bytes.push(codePoint >> 18 | 240, codePoint >> 12 & 63 | 128, codePoint >> 6 & 63 | 128, codePoint & 63 | 128);
        } else {
          throw new Error("Invalid code point");
        }
      }
      return bytes;
    }
    function asciiToBytes(str) {
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        byteArray.push(str.charCodeAt(i) & 255);
      }
      return byteArray;
    }
    function utf16leToBytes(str, units) {
      let c, hi, lo;
      const byteArray = [];
      for (let i = 0; i < str.length; ++i) {
        if ((units -= 2) < 0)
          break;
        c = str.charCodeAt(i);
        hi = c >> 8;
        lo = c % 256;
        byteArray.push(lo);
        byteArray.push(hi);
      }
      return byteArray;
    }
    function base64ToBytes(str) {
      return base642.toByteArray(base64clean(str));
    }
    function blitBuffer(src2, dst, offset, length2) {
      let i;
      for (i = 0; i < length2; ++i) {
        if (i + offset >= dst.length || i >= src2.length)
          break;
        dst[i + offset] = src2[i];
      }
      return i;
    }
    function isInstance(obj, type) {
      return obj instanceof type || obj != null && obj.constructor != null && obj.constructor.name != null && obj.constructor.name === type.name;
    }
    function numberIsNaN(obj) {
      return obj !== obj;
    }
    var hexSliceLookupTable = function() {
      const alphabet = "0123456789abcdef";
      const table = new Array(256);
      for (let i = 0; i < 16; ++i) {
        const i16 = i * 16;
        for (let j = 0; j < 16; ++j) {
          table[i16 + j] = alphabet[i] + alphabet[j];
        }
      }
      return table;
    }();
    function defineBigIntMethod(fn) {
      return typeof BigInt === "undefined" ? BufferBigIntNotDefined : fn;
    }
    function BufferBigIntNotDefined() {
      throw new Error("BigInt not supported");
    }
  }
});

// ../../node_modules/ipfs-unixfs-importer/node_modules/bl/BufferList.js
var require_BufferList = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/node_modules/bl/BufferList.js"(exports2, module2) {
    "use strict";
    var { Buffer: Buffer2 } = require_buffer();
    var symbol = Symbol.for("BufferList");
    function BufferList(buf) {
      if (!(this instanceof BufferList)) {
        return new BufferList(buf);
      }
      BufferList._init.call(this, buf);
    }
    BufferList._init = function _init(buf) {
      Object.defineProperty(this, symbol, { value: true });
      this._bufs = [];
      this.length = 0;
      if (buf) {
        this.append(buf);
      }
    };
    BufferList.prototype._new = function _new(buf) {
      return new BufferList(buf);
    };
    BufferList.prototype._offset = function _offset(offset) {
      if (offset === 0) {
        return [0, 0];
      }
      let tot = 0;
      for (let i = 0; i < this._bufs.length; i++) {
        const _t = tot + this._bufs[i].length;
        if (offset < _t || i === this._bufs.length - 1) {
          return [i, offset - tot];
        }
        tot = _t;
      }
    };
    BufferList.prototype._reverseOffset = function(blOffset) {
      const bufferId = blOffset[0];
      let offset = blOffset[1];
      for (let i = 0; i < bufferId; i++) {
        offset += this._bufs[i].length;
      }
      return offset;
    };
    BufferList.prototype.get = function get(index) {
      if (index > this.length || index < 0) {
        return void 0;
      }
      const offset = this._offset(index);
      return this._bufs[offset[0]][offset[1]];
    };
    BufferList.prototype.slice = function slice(start, end) {
      if (typeof start === "number" && start < 0) {
        start += this.length;
      }
      if (typeof end === "number" && end < 0) {
        end += this.length;
      }
      return this.copy(null, 0, start, end);
    };
    BufferList.prototype.copy = function copy(dst, dstStart, srcStart, srcEnd) {
      if (typeof srcStart !== "number" || srcStart < 0) {
        srcStart = 0;
      }
      if (typeof srcEnd !== "number" || srcEnd > this.length) {
        srcEnd = this.length;
      }
      if (srcStart >= this.length) {
        return dst || Buffer2.alloc(0);
      }
      if (srcEnd <= 0) {
        return dst || Buffer2.alloc(0);
      }
      const copy2 = !!dst;
      const off = this._offset(srcStart);
      const len = srcEnd - srcStart;
      let bytes = len;
      let bufoff = copy2 && dstStart || 0;
      let start = off[1];
      if (srcStart === 0 && srcEnd === this.length) {
        if (!copy2) {
          return this._bufs.length === 1 ? this._bufs[0] : Buffer2.concat(this._bufs, this.length);
        }
        for (let i = 0; i < this._bufs.length; i++) {
          this._bufs[i].copy(dst, bufoff);
          bufoff += this._bufs[i].length;
        }
        return dst;
      }
      if (bytes <= this._bufs[off[0]].length - start) {
        return copy2 ? this._bufs[off[0]].copy(dst, dstStart, start, start + bytes) : this._bufs[off[0]].slice(start, start + bytes);
      }
      if (!copy2) {
        dst = Buffer2.allocUnsafe(len);
      }
      for (let i = off[0]; i < this._bufs.length; i++) {
        const l = this._bufs[i].length - start;
        if (bytes > l) {
          this._bufs[i].copy(dst, bufoff, start);
          bufoff += l;
        } else {
          this._bufs[i].copy(dst, bufoff, start, start + bytes);
          bufoff += l;
          break;
        }
        bytes -= l;
        if (start) {
          start = 0;
        }
      }
      if (dst.length > bufoff)
        return dst.slice(0, bufoff);
      return dst;
    };
    BufferList.prototype.shallowSlice = function shallowSlice(start, end) {
      start = start || 0;
      end = typeof end !== "number" ? this.length : end;
      if (start < 0) {
        start += this.length;
      }
      if (end < 0) {
        end += this.length;
      }
      if (start === end) {
        return this._new();
      }
      const startOffset = this._offset(start);
      const endOffset = this._offset(end);
      const buffers = this._bufs.slice(startOffset[0], endOffset[0] + 1);
      if (endOffset[1] === 0) {
        buffers.pop();
      } else {
        buffers[buffers.length - 1] = buffers[buffers.length - 1].slice(0, endOffset[1]);
      }
      if (startOffset[1] !== 0) {
        buffers[0] = buffers[0].slice(startOffset[1]);
      }
      return this._new(buffers);
    };
    BufferList.prototype.toString = function toString3(encoding, start, end) {
      return this.slice(start, end).toString(encoding);
    };
    BufferList.prototype.consume = function consume(bytes) {
      bytes = Math.trunc(bytes);
      if (Number.isNaN(bytes) || bytes <= 0)
        return this;
      while (this._bufs.length) {
        if (bytes >= this._bufs[0].length) {
          bytes -= this._bufs[0].length;
          this.length -= this._bufs[0].length;
          this._bufs.shift();
        } else {
          this._bufs[0] = this._bufs[0].slice(bytes);
          this.length -= bytes;
          break;
        }
      }
      return this;
    };
    BufferList.prototype.duplicate = function duplicate() {
      const copy = this._new();
      for (let i = 0; i < this._bufs.length; i++) {
        copy.append(this._bufs[i]);
      }
      return copy;
    };
    BufferList.prototype.append = function append(buf) {
      if (buf == null) {
        return this;
      }
      if (buf.buffer) {
        this._appendBuffer(Buffer2.from(buf.buffer, buf.byteOffset, buf.byteLength));
      } else if (Array.isArray(buf)) {
        for (let i = 0; i < buf.length; i++) {
          this.append(buf[i]);
        }
      } else if (this._isBufferList(buf)) {
        for (let i = 0; i < buf._bufs.length; i++) {
          this.append(buf._bufs[i]);
        }
      } else {
        if (typeof buf === "number") {
          buf = buf.toString();
        }
        this._appendBuffer(Buffer2.from(buf));
      }
      return this;
    };
    BufferList.prototype._appendBuffer = function appendBuffer(buf) {
      this._bufs.push(buf);
      this.length += buf.length;
    };
    BufferList.prototype.indexOf = function(search, offset, encoding) {
      if (encoding === void 0 && typeof offset === "string") {
        encoding = offset;
        offset = void 0;
      }
      if (typeof search === "function" || Array.isArray(search)) {
        throw new TypeError('The "value" argument must be one of type string, Buffer, BufferList, or Uint8Array.');
      } else if (typeof search === "number") {
        search = Buffer2.from([search]);
      } else if (typeof search === "string") {
        search = Buffer2.from(search, encoding);
      } else if (this._isBufferList(search)) {
        search = search.slice();
      } else if (Array.isArray(search.buffer)) {
        search = Buffer2.from(search.buffer, search.byteOffset, search.byteLength);
      } else if (!Buffer2.isBuffer(search)) {
        search = Buffer2.from(search);
      }
      offset = Number(offset || 0);
      if (isNaN(offset)) {
        offset = 0;
      }
      if (offset < 0) {
        offset = this.length + offset;
      }
      if (offset < 0) {
        offset = 0;
      }
      if (search.length === 0) {
        return offset > this.length ? this.length : offset;
      }
      const blOffset = this._offset(offset);
      let blIndex = blOffset[0];
      let buffOffset = blOffset[1];
      for (; blIndex < this._bufs.length; blIndex++) {
        const buff = this._bufs[blIndex];
        while (buffOffset < buff.length) {
          const availableWindow = buff.length - buffOffset;
          if (availableWindow >= search.length) {
            const nativeSearchResult = buff.indexOf(search, buffOffset);
            if (nativeSearchResult !== -1) {
              return this._reverseOffset([blIndex, nativeSearchResult]);
            }
            buffOffset = buff.length - search.length + 1;
          } else {
            const revOffset = this._reverseOffset([blIndex, buffOffset]);
            if (this._match(revOffset, search)) {
              return revOffset;
            }
            buffOffset++;
          }
        }
        buffOffset = 0;
      }
      return -1;
    };
    BufferList.prototype._match = function(offset, search) {
      if (this.length - offset < search.length) {
        return false;
      }
      for (let searchOffset = 0; searchOffset < search.length; searchOffset++) {
        if (this.get(offset + searchOffset) !== search[searchOffset]) {
          return false;
        }
      }
      return true;
    };
    (function() {
      const methods = {
        readDoubleBE: 8,
        readDoubleLE: 8,
        readFloatBE: 4,
        readFloatLE: 4,
        readInt32BE: 4,
        readInt32LE: 4,
        readUInt32BE: 4,
        readUInt32LE: 4,
        readInt16BE: 2,
        readInt16LE: 2,
        readUInt16BE: 2,
        readUInt16LE: 2,
        readInt8: 1,
        readUInt8: 1,
        readIntBE: null,
        readIntLE: null,
        readUIntBE: null,
        readUIntLE: null
      };
      for (const m in methods) {
        (function(m2) {
          if (methods[m2] === null) {
            BufferList.prototype[m2] = function(offset, byteLength) {
              return this.slice(offset, offset + byteLength)[m2](0, byteLength);
            };
          } else {
            BufferList.prototype[m2] = function(offset = 0) {
              return this.slice(offset, offset + methods[m2])[m2](0);
            };
          }
        })(m);
      }
    })();
    BufferList.prototype._isBufferList = function _isBufferList(b) {
      return b instanceof BufferList || BufferList.isBufferList(b);
    };
    BufferList.isBufferList = function isBufferList(b) {
      return b != null && b[symbol];
    };
    module2.exports = BufferList;
  }
});

// ../../node_modules/rabin-wasm/src/rabin.js
var require_rabin = __commonJS({
  "../../node_modules/rabin-wasm/src/rabin.js"(exports2, module2) {
    var Rabin = class {
      constructor(asModule, bits = 12, min = 8 * 1024, max = 32 * 1024, windowSize = 64, polynomial) {
        this.bits = bits;
        this.min = min;
        this.max = max;
        this.asModule = asModule;
        this.rabin = new asModule.Rabin(bits, min, max, windowSize, polynomial);
        this.polynomial = polynomial;
      }
      fingerprint(buf) {
        const {
          __retain,
          __release,
          __allocArray,
          __getInt32Array,
          Int32Array_ID,
          Uint8Array_ID
        } = this.asModule;
        const lengths = new Int32Array(Math.ceil(buf.length / this.min));
        const lengthsPtr = __retain(__allocArray(Int32Array_ID, lengths));
        const pointer = __retain(__allocArray(Uint8Array_ID, buf));
        const out = this.rabin.fingerprint(pointer, lengthsPtr);
        const processed = __getInt32Array(out);
        __release(pointer);
        __release(lengthsPtr);
        const end = processed.indexOf(0);
        return end >= 0 ? processed.subarray(0, end) : processed;
      }
    };
    module2.exports = Rabin;
  }
});

// ../../node_modules/@assemblyscript/loader/index.js
var require_loader = __commonJS({
  "../../node_modules/@assemblyscript/loader/index.js"(exports2) {
    "use strict";
    var ID_OFFSET = -8;
    var SIZE_OFFSET = -4;
    var ARRAYBUFFER_ID = 0;
    var STRING_ID = 1;
    var ARRAYBUFFERVIEW = 1 << 0;
    var ARRAY = 1 << 1;
    var SET = 1 << 2;
    var MAP = 1 << 3;
    var VAL_ALIGN_OFFSET = 5;
    var VAL_ALIGN = 1 << VAL_ALIGN_OFFSET;
    var VAL_SIGNED = 1 << 10;
    var VAL_FLOAT = 1 << 11;
    var VAL_NULLABLE = 1 << 12;
    var VAL_MANAGED = 1 << 13;
    var KEY_ALIGN_OFFSET = 14;
    var KEY_ALIGN = 1 << KEY_ALIGN_OFFSET;
    var KEY_SIGNED = 1 << 19;
    var KEY_FLOAT = 1 << 20;
    var KEY_NULLABLE = 1 << 21;
    var KEY_MANAGED = 1 << 22;
    var ARRAYBUFFERVIEW_BUFFER_OFFSET = 0;
    var ARRAYBUFFERVIEW_DATASTART_OFFSET = 4;
    var ARRAYBUFFERVIEW_DATALENGTH_OFFSET = 8;
    var ARRAYBUFFERVIEW_SIZE = 12;
    var ARRAY_LENGTH_OFFSET = 12;
    var ARRAY_SIZE = 16;
    var BIGINT = typeof BigUint64Array !== "undefined";
    var THIS = Symbol();
    var CHUNKSIZE = 1024;
    function getStringImpl(buffer, ptr) {
      const U32 = new Uint32Array(buffer);
      const U16 = new Uint16Array(buffer);
      var length2 = U32[ptr + SIZE_OFFSET >>> 2] >>> 1;
      var offset = ptr >>> 1;
      if (length2 <= CHUNKSIZE)
        return String.fromCharCode.apply(String, U16.subarray(offset, offset + length2));
      const parts = [];
      do {
        const last = U16[offset + CHUNKSIZE - 1];
        const size = last >= 55296 && last < 56320 ? CHUNKSIZE - 1 : CHUNKSIZE;
        parts.push(String.fromCharCode.apply(String, U16.subarray(offset, offset += size)));
        length2 -= size;
      } while (length2 > CHUNKSIZE);
      return parts.join("") + String.fromCharCode.apply(String, U16.subarray(offset, offset + length2));
    }
    function preInstantiate(imports2) {
      const baseModule = {};
      function getString(memory, ptr) {
        if (!memory)
          return "<yet unknown>";
        return getStringImpl(memory.buffer, ptr);
      }
      const env = imports2.env = imports2.env || {};
      env.abort = env.abort || function abort(mesg, file, line, colm) {
        const memory = baseModule.memory || env.memory;
        throw Error("abort: " + getString(memory, mesg) + " at " + getString(memory, file) + ":" + line + ":" + colm);
      };
      env.trace = env.trace || function trace(mesg, n) {
        const memory = baseModule.memory || env.memory;
        console.log("trace: " + getString(memory, mesg) + (n ? " " : "") + Array.prototype.slice.call(arguments, 2, 2 + n).join(", "));
      };
      imports2.Math = imports2.Math || Math;
      imports2.Date = imports2.Date || Date;
      return baseModule;
    }
    function postInstantiate(baseModule, instance) {
      const rawExports = instance.exports;
      const memory = rawExports.memory;
      const table = rawExports.table;
      const alloc = rawExports["__alloc"];
      const retain = rawExports["__retain"];
      const rttiBase = rawExports["__rtti_base"] || ~0;
      function getInfo(id) {
        const U32 = new Uint32Array(memory.buffer);
        const count = U32[rttiBase >>> 2];
        if ((id >>>= 0) >= count)
          throw Error("invalid id: " + id);
        return U32[(rttiBase + 4 >>> 2) + id * 2];
      }
      function getBase(id) {
        const U32 = new Uint32Array(memory.buffer);
        const count = U32[rttiBase >>> 2];
        if ((id >>>= 0) >= count)
          throw Error("invalid id: " + id);
        return U32[(rttiBase + 4 >>> 2) + id * 2 + 1];
      }
      function getValueAlign(info) {
        return 31 - Math.clz32(info >>> VAL_ALIGN_OFFSET & 31);
      }
      function getKeyAlign(info) {
        return 31 - Math.clz32(info >>> KEY_ALIGN_OFFSET & 31);
      }
      function __allocString(str) {
        const length2 = str.length;
        const ptr = alloc(length2 << 1, STRING_ID);
        const U16 = new Uint16Array(memory.buffer);
        for (var i = 0, p = ptr >>> 1; i < length2; ++i)
          U16[p + i] = str.charCodeAt(i);
        return ptr;
      }
      baseModule.__allocString = __allocString;
      function __getString(ptr) {
        const buffer = memory.buffer;
        const id = new Uint32Array(buffer)[ptr + ID_OFFSET >>> 2];
        if (id !== STRING_ID)
          throw Error("not a string: " + ptr);
        return getStringImpl(buffer, ptr);
      }
      baseModule.__getString = __getString;
      function getView(alignLog2, signed, float) {
        const buffer = memory.buffer;
        if (float) {
          switch (alignLog2) {
            case 2:
              return new Float32Array(buffer);
            case 3:
              return new Float64Array(buffer);
          }
        } else {
          switch (alignLog2) {
            case 0:
              return new (signed ? Int8Array : Uint8Array)(buffer);
            case 1:
              return new (signed ? Int16Array : Uint16Array)(buffer);
            case 2:
              return new (signed ? Int32Array : Uint32Array)(buffer);
            case 3:
              return new (signed ? BigInt64Array : BigUint64Array)(buffer);
          }
        }
        throw Error("unsupported align: " + alignLog2);
      }
      function __allocArray(id, values) {
        const info = getInfo(id);
        if (!(info & (ARRAYBUFFERVIEW | ARRAY)))
          throw Error("not an array: " + id + " @ " + info);
        const align = getValueAlign(info);
        const length2 = values.length;
        const buf = alloc(length2 << align, ARRAYBUFFER_ID);
        const arr = alloc(info & ARRAY ? ARRAY_SIZE : ARRAYBUFFERVIEW_SIZE, id);
        const U32 = new Uint32Array(memory.buffer);
        U32[arr + ARRAYBUFFERVIEW_BUFFER_OFFSET >>> 2] = retain(buf);
        U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2] = buf;
        U32[arr + ARRAYBUFFERVIEW_DATALENGTH_OFFSET >>> 2] = length2 << align;
        if (info & ARRAY)
          U32[arr + ARRAY_LENGTH_OFFSET >>> 2] = length2;
        const view = getView(align, info & VAL_SIGNED, info & VAL_FLOAT);
        if (info & VAL_MANAGED) {
          for (let i = 0; i < length2; ++i)
            view[(buf >>> align) + i] = retain(values[i]);
        } else {
          view.set(values, buf >>> align);
        }
        return arr;
      }
      baseModule.__allocArray = __allocArray;
      function __getArrayView(arr) {
        const U32 = new Uint32Array(memory.buffer);
        const id = U32[arr + ID_OFFSET >>> 2];
        const info = getInfo(id);
        if (!(info & ARRAYBUFFERVIEW))
          throw Error("not an array: " + id);
        const align = getValueAlign(info);
        var buf = U32[arr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
        const length2 = info & ARRAY ? U32[arr + ARRAY_LENGTH_OFFSET >>> 2] : U32[buf + SIZE_OFFSET >>> 2] >>> align;
        return getView(align, info & VAL_SIGNED, info & VAL_FLOAT).subarray(buf >>>= align, buf + length2);
      }
      baseModule.__getArrayView = __getArrayView;
      function __getArray(arr) {
        const input = __getArrayView(arr);
        const len = input.length;
        const out = new Array(len);
        for (let i = 0; i < len; i++)
          out[i] = input[i];
        return out;
      }
      baseModule.__getArray = __getArray;
      function __getArrayBuffer(ptr) {
        const buffer = memory.buffer;
        const length2 = new Uint32Array(buffer)[ptr + SIZE_OFFSET >>> 2];
        return buffer.slice(ptr, ptr + length2);
      }
      baseModule.__getArrayBuffer = __getArrayBuffer;
      function getTypedArray(Type, alignLog2, ptr) {
        return new Type(getTypedArrayView(Type, alignLog2, ptr));
      }
      function getTypedArrayView(Type, alignLog2, ptr) {
        const buffer = memory.buffer;
        const U32 = new Uint32Array(buffer);
        const bufPtr = U32[ptr + ARRAYBUFFERVIEW_DATASTART_OFFSET >>> 2];
        return new Type(buffer, bufPtr, U32[bufPtr + SIZE_OFFSET >>> 2] >>> alignLog2);
      }
      baseModule.__getInt8Array = getTypedArray.bind(null, Int8Array, 0);
      baseModule.__getInt8ArrayView = getTypedArrayView.bind(null, Int8Array, 0);
      baseModule.__getUint8Array = getTypedArray.bind(null, Uint8Array, 0);
      baseModule.__getUint8ArrayView = getTypedArrayView.bind(null, Uint8Array, 0);
      baseModule.__getUint8ClampedArray = getTypedArray.bind(null, Uint8ClampedArray, 0);
      baseModule.__getUint8ClampedArrayView = getTypedArrayView.bind(null, Uint8ClampedArray, 0);
      baseModule.__getInt16Array = getTypedArray.bind(null, Int16Array, 1);
      baseModule.__getInt16ArrayView = getTypedArrayView.bind(null, Int16Array, 1);
      baseModule.__getUint16Array = getTypedArray.bind(null, Uint16Array, 1);
      baseModule.__getUint16ArrayView = getTypedArrayView.bind(null, Uint16Array, 1);
      baseModule.__getInt32Array = getTypedArray.bind(null, Int32Array, 2);
      baseModule.__getInt32ArrayView = getTypedArrayView.bind(null, Int32Array, 2);
      baseModule.__getUint32Array = getTypedArray.bind(null, Uint32Array, 2);
      baseModule.__getUint32ArrayView = getTypedArrayView.bind(null, Uint32Array, 2);
      if (BIGINT) {
        baseModule.__getInt64Array = getTypedArray.bind(null, BigInt64Array, 3);
        baseModule.__getInt64ArrayView = getTypedArrayView.bind(null, BigInt64Array, 3);
        baseModule.__getUint64Array = getTypedArray.bind(null, BigUint64Array, 3);
        baseModule.__getUint64ArrayView = getTypedArrayView.bind(null, BigUint64Array, 3);
      }
      baseModule.__getFloat32Array = getTypedArray.bind(null, Float32Array, 2);
      baseModule.__getFloat32ArrayView = getTypedArrayView.bind(null, Float32Array, 2);
      baseModule.__getFloat64Array = getTypedArray.bind(null, Float64Array, 3);
      baseModule.__getFloat64ArrayView = getTypedArrayView.bind(null, Float64Array, 3);
      function __instanceof(ptr, baseId) {
        const U32 = new Uint32Array(memory.buffer);
        var id = U32[ptr + ID_OFFSET >>> 2];
        if (id <= U32[rttiBase >>> 2]) {
          do
            if (id == baseId)
              return true;
          while (id = getBase(id));
        }
        return false;
      }
      baseModule.__instanceof = __instanceof;
      baseModule.memory = baseModule.memory || memory;
      baseModule.table = baseModule.table || table;
      return demangle(rawExports, baseModule);
    }
    function isResponse(o) {
      return typeof Response !== "undefined" && o instanceof Response;
    }
    async function instantiate(source, imports2) {
      if (isResponse(source = await source))
        return instantiateStreaming(source, imports2);
      return postInstantiate(preInstantiate(imports2 || (imports2 = {})), await WebAssembly.instantiate(source instanceof WebAssembly.Module ? source : await WebAssembly.compile(source), imports2));
    }
    exports2.instantiate = instantiate;
    function instantiateSync(source, imports2) {
      return postInstantiate(preInstantiate(imports2 || (imports2 = {})), new WebAssembly.Instance(source instanceof WebAssembly.Module ? source : new WebAssembly.Module(source), imports2));
    }
    exports2.instantiateSync = instantiateSync;
    async function instantiateStreaming(source, imports2) {
      if (!WebAssembly.instantiateStreaming) {
        return instantiate(isResponse(source = await source) ? source.arrayBuffer() : source, imports2);
      }
      return postInstantiate(preInstantiate(imports2 || (imports2 = {})), (await WebAssembly.instantiateStreaming(source, imports2)).instance);
    }
    exports2.instantiateStreaming = instantiateStreaming;
    function demangle(exports3, baseModule) {
      var module3 = baseModule ? Object.create(baseModule) : {};
      var setArgumentsLength = exports3["__argumentsLength"] ? function(length2) {
        exports3["__argumentsLength"].value = length2;
      } : exports3["__setArgumentsLength"] || exports3["__setargc"] || function() {
      };
      for (let internalName in exports3) {
        if (!Object.prototype.hasOwnProperty.call(exports3, internalName))
          continue;
        const elem = exports3[internalName];
        let parts = internalName.split(".");
        let curr = module3;
        while (parts.length > 1) {
          let part = parts.shift();
          if (!Object.prototype.hasOwnProperty.call(curr, part))
            curr[part] = {};
          curr = curr[part];
        }
        let name3 = parts[0];
        let hash = name3.indexOf("#");
        if (hash >= 0) {
          let className = name3.substring(0, hash);
          let classElem = curr[className];
          if (typeof classElem === "undefined" || !classElem.prototype) {
            let ctor = function(...args) {
              return ctor.wrap(ctor.prototype.constructor(0, ...args));
            };
            ctor.prototype = {
              valueOf: function valueOf() {
                return this[THIS];
              }
            };
            ctor.wrap = function(thisValue) {
              return Object.create(ctor.prototype, { [THIS]: { value: thisValue, writable: false } });
            };
            if (classElem)
              Object.getOwnPropertyNames(classElem).forEach((name4) => Object.defineProperty(ctor, name4, Object.getOwnPropertyDescriptor(classElem, name4)));
            curr[className] = ctor;
          }
          name3 = name3.substring(hash + 1);
          curr = curr[className].prototype;
          if (/^(get|set):/.test(name3)) {
            if (!Object.prototype.hasOwnProperty.call(curr, name3 = name3.substring(4))) {
              let getter = exports3[internalName.replace("set:", "get:")];
              let setter = exports3[internalName.replace("get:", "set:")];
              Object.defineProperty(curr, name3, {
                get: function() {
                  return getter(this[THIS]);
                },
                set: function(value) {
                  setter(this[THIS], value);
                },
                enumerable: true
              });
            }
          } else {
            if (name3 === "constructor") {
              (curr[name3] = (...args) => {
                setArgumentsLength(args.length);
                return elem(...args);
              }).original = elem;
            } else {
              (curr[name3] = function(...args) {
                setArgumentsLength(args.length);
                return elem(this[THIS], ...args);
              }).original = elem;
            }
          }
        } else {
          if (/^(get|set):/.test(name3)) {
            if (!Object.prototype.hasOwnProperty.call(curr, name3 = name3.substring(4))) {
              Object.defineProperty(curr, name3, {
                get: exports3[internalName.replace("set:", "get:")],
                set: exports3[internalName.replace("get:", "set:")],
                enumerable: true
              });
            }
          } else if (typeof elem === "function" && elem !== setArgumentsLength) {
            (curr[name3] = (...args) => {
              setArgumentsLength(args.length);
              return elem(...args);
            }).original = elem;
          } else {
            curr[name3] = elem;
          }
        }
      }
      return module3;
    }
    exports2.demangle = demangle;
  }
});

// ../../node_modules/rabin-wasm/dist/rabin-wasm.js
var require_rabin_wasm = __commonJS({
  "../../node_modules/rabin-wasm/dist/rabin-wasm.js"(exports2, module2) {
    var { instantiate } = require_loader();
    loadWebAssembly.supported = typeof WebAssembly !== "undefined";
    function loadWebAssembly(imp = {}) {
      if (!loadWebAssembly.supported)
        return null;
      var wasm = new Uint8Array([0, 97, 115, 109, 1, 0, 0, 0, 1, 78, 14, 96, 2, 127, 126, 0, 96, 1, 127, 1, 126, 96, 2, 127, 127, 0, 96, 1, 127, 1, 127, 96, 1, 127, 0, 96, 2, 127, 127, 1, 127, 96, 3, 127, 127, 127, 1, 127, 96, 0, 0, 96, 3, 127, 127, 127, 0, 96, 0, 1, 127, 96, 4, 127, 127, 127, 127, 0, 96, 5, 127, 127, 127, 127, 127, 1, 127, 96, 1, 126, 1, 127, 96, 2, 126, 126, 1, 126, 2, 13, 1, 3, 101, 110, 118, 5, 97, 98, 111, 114, 116, 0, 10, 3, 54, 53, 2, 2, 8, 9, 3, 5, 2, 8, 6, 5, 3, 4, 2, 6, 9, 12, 13, 2, 5, 11, 3, 2, 3, 2, 3, 2, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 1, 0, 6, 7, 7, 4, 4, 5, 3, 1, 0, 1, 6, 47, 9, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 0, 65, 3, 11, 127, 0, 65, 4, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 1, 65, 0, 11, 127, 0, 65, 240, 2, 11, 127, 0, 65, 6, 11, 7, 240, 5, 41, 6, 109, 101, 109, 111, 114, 121, 2, 0, 7, 95, 95, 97, 108, 108, 111, 99, 0, 10, 8, 95, 95, 114, 101, 116, 97, 105, 110, 0, 11, 9, 95, 95, 114, 101, 108, 101, 97, 115, 101, 0, 12, 9, 95, 95, 99, 111, 108, 108, 101, 99, 116, 0, 51, 11, 95, 95, 114, 116, 116, 105, 95, 98, 97, 115, 101, 3, 7, 13, 73, 110, 116, 51, 50, 65, 114, 114, 97, 121, 95, 73, 68, 3, 2, 13, 85, 105, 110, 116, 56, 65, 114, 114, 97, 121, 95, 73, 68, 3, 3, 6, 100, 101, 103, 114, 101, 101, 0, 16, 3, 109, 111, 100, 0, 17, 5, 82, 97, 98, 105, 110, 3, 8, 16, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 119, 105, 110, 100, 111, 119, 0, 21, 16, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 119, 105, 110, 100, 111, 119, 0, 22, 21, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 119, 105, 110, 100, 111, 119, 95, 115, 105, 122, 101, 0, 23, 21, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 119, 105, 110, 100, 111, 119, 95, 115, 105, 122, 101, 0, 24, 14, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 119, 112, 111, 115, 0, 25, 14, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 119, 112, 111, 115, 0, 26, 15, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 99, 111, 117, 110, 116, 0, 27, 15, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 99, 111, 117, 110, 116, 0, 28, 13, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 112, 111, 115, 0, 29, 13, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 112, 111, 115, 0, 30, 15, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 115, 116, 97, 114, 116, 0, 31, 15, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 115, 116, 97, 114, 116, 0, 32, 16, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 100, 105, 103, 101, 115, 116, 0, 33, 16, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 100, 105, 103, 101, 115, 116, 0, 34, 21, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 99, 104, 117, 110, 107, 95, 115, 116, 97, 114, 116, 0, 35, 21, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 99, 104, 117, 110, 107, 95, 115, 116, 97, 114, 116, 0, 36, 22, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 99, 104, 117, 110, 107, 95, 108, 101, 110, 103, 116, 104, 0, 37, 22, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 99, 104, 117, 110, 107, 95, 108, 101, 110, 103, 116, 104, 0, 38, 31, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 99, 104, 117, 110, 107, 95, 99, 117, 116, 95, 102, 105, 110, 103, 101, 114, 112, 114, 105, 110, 116, 0, 39, 31, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 99, 104, 117, 110, 107, 95, 99, 117, 116, 95, 102, 105, 110, 103, 101, 114, 112, 114, 105, 110, 116, 0, 40, 20, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 112, 111, 108, 121, 110, 111, 109, 105, 97, 108, 0, 41, 20, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 112, 111, 108, 121, 110, 111, 109, 105, 97, 108, 0, 42, 17, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 109, 105, 110, 115, 105, 122, 101, 0, 43, 17, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 109, 105, 110, 115, 105, 122, 101, 0, 44, 17, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 109, 97, 120, 115, 105, 122, 101, 0, 45, 17, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 109, 97, 120, 115, 105, 122, 101, 0, 46, 14, 82, 97, 98, 105, 110, 35, 103, 101, 116, 58, 109, 97, 115, 107, 0, 47, 14, 82, 97, 98, 105, 110, 35, 115, 101, 116, 58, 109, 97, 115, 107, 0, 48, 17, 82, 97, 98, 105, 110, 35, 99, 111, 110, 115, 116, 114, 117, 99, 116, 111, 114, 0, 20, 17, 82, 97, 98, 105, 110, 35, 102, 105, 110, 103, 101, 114, 112, 114, 105, 110, 116, 0, 49, 8, 1, 50, 10, 165, 31, 53, 199, 1, 1, 4, 127, 32, 1, 40, 2, 0, 65, 124, 113, 34, 2, 65, 128, 2, 73, 4, 127, 32, 2, 65, 4, 118, 33, 4, 65, 0, 5, 32, 2, 65, 31, 32, 2, 103, 107, 34, 3, 65, 4, 107, 118, 65, 16, 115, 33, 4, 32, 3, 65, 7, 107, 11, 33, 3, 32, 1, 40, 2, 20, 33, 2, 32, 1, 40, 2, 16, 34, 5, 4, 64, 32, 5, 32, 2, 54, 2, 20, 11, 32, 2, 4, 64, 32, 2, 32, 5, 54, 2, 16, 11, 32, 1, 32, 0, 32, 4, 32, 3, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 70, 4, 64, 32, 0, 32, 4, 32, 3, 65, 4, 116, 106, 65, 2, 116, 106, 32, 2, 54, 2, 96, 32, 2, 69, 4, 64, 32, 0, 32, 3, 65, 2, 116, 106, 32, 0, 32, 3, 65, 2, 116, 106, 40, 2, 4, 65, 1, 32, 4, 116, 65, 127, 115, 113, 34, 1, 54, 2, 4, 32, 1, 69, 4, 64, 32, 0, 32, 0, 40, 2, 0, 65, 1, 32, 3, 116, 65, 127, 115, 113, 54, 2, 0, 11, 11, 11, 11, 226, 2, 1, 6, 127, 32, 1, 40, 2, 0, 33, 3, 32, 1, 65, 16, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 34, 4, 40, 2, 0, 34, 5, 65, 1, 113, 4, 64, 32, 3, 65, 124, 113, 65, 16, 106, 32, 5, 65, 124, 113, 106, 34, 2, 65, 240, 255, 255, 255, 3, 73, 4, 64, 32, 0, 32, 4, 16, 1, 32, 1, 32, 2, 32, 3, 65, 3, 113, 114, 34, 3, 54, 2, 0, 32, 1, 65, 16, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 34, 4, 40, 2, 0, 33, 5, 11, 11, 32, 3, 65, 2, 113, 4, 64, 32, 1, 65, 4, 107, 40, 2, 0, 34, 2, 40, 2, 0, 34, 6, 65, 124, 113, 65, 16, 106, 32, 3, 65, 124, 113, 106, 34, 7, 65, 240, 255, 255, 255, 3, 73, 4, 64, 32, 0, 32, 2, 16, 1, 32, 2, 32, 7, 32, 6, 65, 3, 113, 114, 34, 3, 54, 2, 0, 32, 2, 33, 1, 11, 11, 32, 4, 32, 5, 65, 2, 114, 54, 2, 0, 32, 4, 65, 4, 107, 32, 1, 54, 2, 0, 32, 0, 32, 3, 65, 124, 113, 34, 2, 65, 128, 2, 73, 4, 127, 32, 2, 65, 4, 118, 33, 4, 65, 0, 5, 32, 2, 65, 31, 32, 2, 103, 107, 34, 2, 65, 4, 107, 118, 65, 16, 115, 33, 4, 32, 2, 65, 7, 107, 11, 34, 3, 65, 4, 116, 32, 4, 106, 65, 2, 116, 106, 40, 2, 96, 33, 2, 32, 1, 65, 0, 54, 2, 16, 32, 1, 32, 2, 54, 2, 20, 32, 2, 4, 64, 32, 2, 32, 1, 54, 2, 16, 11, 32, 0, 32, 4, 32, 3, 65, 4, 116, 106, 65, 2, 116, 106, 32, 1, 54, 2, 96, 32, 0, 32, 0, 40, 2, 0, 65, 1, 32, 3, 116, 114, 54, 2, 0, 32, 0, 32, 3, 65, 2, 116, 106, 32, 0, 32, 3, 65, 2, 116, 106, 40, 2, 4, 65, 1, 32, 4, 116, 114, 54, 2, 4, 11, 119, 1, 1, 127, 32, 2, 2, 127, 32, 0, 40, 2, 160, 12, 34, 2, 4, 64, 32, 2, 32, 1, 65, 16, 107, 70, 4, 64, 32, 2, 40, 2, 0, 33, 3, 32, 1, 65, 16, 107, 33, 1, 11, 11, 32, 1, 11, 107, 34, 2, 65, 48, 73, 4, 64, 15, 11, 32, 1, 32, 3, 65, 2, 113, 32, 2, 65, 32, 107, 65, 1, 114, 114, 54, 2, 0, 32, 1, 65, 0, 54, 2, 16, 32, 1, 65, 0, 54, 2, 20, 32, 1, 32, 2, 106, 65, 16, 107, 34, 2, 65, 2, 54, 2, 0, 32, 0, 32, 2, 54, 2, 160, 12, 32, 0, 32, 1, 16, 2, 11, 155, 1, 1, 3, 127, 35, 0, 34, 0, 69, 4, 64, 65, 1, 63, 0, 34, 0, 74, 4, 127, 65, 1, 32, 0, 107, 64, 0, 65, 0, 72, 5, 65, 0, 11, 4, 64, 0, 11, 65, 176, 3, 34, 0, 65, 0, 54, 2, 0, 65, 208, 15, 65, 0, 54, 2, 0, 3, 64, 32, 1, 65, 23, 73, 4, 64, 32, 1, 65, 2, 116, 65, 176, 3, 106, 65, 0, 54, 2, 4, 65, 0, 33, 2, 3, 64, 32, 2, 65, 16, 73, 4, 64, 32, 1, 65, 4, 116, 32, 2, 106, 65, 2, 116, 65, 176, 3, 106, 65, 0, 54, 2, 96, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 65, 176, 3, 65, 224, 15, 63, 0, 65, 16, 116, 16, 3, 65, 176, 3, 36, 0, 11, 32, 0, 11, 45, 0, 32, 0, 65, 240, 255, 255, 255, 3, 79, 4, 64, 65, 32, 65, 224, 0, 65, 201, 3, 65, 29, 16, 0, 0, 11, 32, 0, 65, 15, 106, 65, 112, 113, 34, 0, 65, 16, 32, 0, 65, 16, 75, 27, 11, 169, 1, 1, 1, 127, 32, 0, 32, 1, 65, 128, 2, 73, 4, 127, 32, 1, 65, 4, 118, 33, 1, 65, 0, 5, 32, 1, 65, 248, 255, 255, 255, 1, 73, 4, 64, 32, 1, 65, 1, 65, 27, 32, 1, 103, 107, 116, 106, 65, 1, 107, 33, 1, 11, 32, 1, 65, 31, 32, 1, 103, 107, 34, 2, 65, 4, 107, 118, 65, 16, 115, 33, 1, 32, 2, 65, 7, 107, 11, 34, 2, 65, 2, 116, 106, 40, 2, 4, 65, 127, 32, 1, 116, 113, 34, 1, 4, 127, 32, 0, 32, 1, 104, 32, 2, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 5, 32, 0, 40, 2, 0, 65, 127, 32, 2, 65, 1, 106, 116, 113, 34, 1, 4, 127, 32, 0, 32, 0, 32, 1, 104, 34, 0, 65, 2, 116, 106, 40, 2, 4, 104, 32, 0, 65, 4, 116, 106, 65, 2, 116, 106, 40, 2, 96, 5, 65, 0, 11, 11, 11, 111, 1, 1, 127, 63, 0, 34, 2, 32, 1, 65, 248, 255, 255, 255, 1, 73, 4, 127, 32, 1, 65, 1, 65, 27, 32, 1, 103, 107, 116, 65, 1, 107, 106, 5, 32, 1, 11, 65, 16, 32, 0, 40, 2, 160, 12, 32, 2, 65, 16, 116, 65, 16, 107, 71, 116, 106, 65, 255, 255, 3, 106, 65, 128, 128, 124, 113, 65, 16, 118, 34, 1, 32, 2, 32, 1, 74, 27, 64, 0, 65, 0, 72, 4, 64, 32, 1, 64, 0, 65, 0, 72, 4, 64, 0, 11, 11, 32, 0, 32, 2, 65, 16, 116, 63, 0, 65, 16, 116, 16, 3, 11, 113, 1, 2, 127, 32, 1, 40, 2, 0, 34, 3, 65, 124, 113, 32, 2, 107, 34, 4, 65, 32, 79, 4, 64, 32, 1, 32, 2, 32, 3, 65, 2, 113, 114, 54, 2, 0, 32, 2, 32, 1, 65, 16, 106, 106, 34, 1, 32, 4, 65, 16, 107, 65, 1, 114, 54, 2, 0, 32, 0, 32, 1, 16, 2, 5, 32, 1, 32, 3, 65, 126, 113, 54, 2, 0, 32, 1, 65, 16, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 32, 1, 65, 16, 106, 32, 1, 40, 2, 0, 65, 124, 113, 106, 40, 2, 0, 65, 125, 113, 54, 2, 0, 11, 11, 91, 1, 2, 127, 32, 0, 32, 1, 16, 5, 34, 4, 16, 6, 34, 3, 69, 4, 64, 65, 1, 36, 1, 65, 0, 36, 1, 32, 0, 32, 4, 16, 6, 34, 3, 69, 4, 64, 32, 0, 32, 4, 16, 7, 32, 0, 32, 4, 16, 6, 33, 3, 11, 11, 32, 3, 65, 0, 54, 2, 4, 32, 3, 32, 2, 54, 2, 8, 32, 3, 32, 1, 54, 2, 12, 32, 0, 32, 3, 16, 1, 32, 0, 32, 3, 32, 4, 16, 8, 32, 3, 11, 13, 0, 16, 4, 32, 0, 32, 1, 16, 9, 65, 16, 106, 11, 33, 1, 1, 127, 32, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 1, 32, 1, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 0, 11, 18, 0, 32, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 16, 52, 11, 11, 140, 3, 1, 1, 127, 2, 64, 32, 1, 69, 13, 0, 32, 0, 65, 0, 58, 0, 0, 32, 0, 32, 1, 106, 65, 1, 107, 65, 0, 58, 0, 0, 32, 1, 65, 2, 77, 13, 0, 32, 0, 65, 1, 106, 65, 0, 58, 0, 0, 32, 0, 65, 2, 106, 65, 0, 58, 0, 0, 32, 0, 32, 1, 106, 34, 2, 65, 2, 107, 65, 0, 58, 0, 0, 32, 2, 65, 3, 107, 65, 0, 58, 0, 0, 32, 1, 65, 6, 77, 13, 0, 32, 0, 65, 3, 106, 65, 0, 58, 0, 0, 32, 0, 32, 1, 106, 65, 4, 107, 65, 0, 58, 0, 0, 32, 1, 65, 8, 77, 13, 0, 32, 1, 65, 0, 32, 0, 107, 65, 3, 113, 34, 1, 107, 33, 2, 32, 0, 32, 1, 106, 34, 0, 65, 0, 54, 2, 0, 32, 0, 32, 2, 65, 124, 113, 34, 1, 106, 65, 4, 107, 65, 0, 54, 2, 0, 32, 1, 65, 8, 77, 13, 0, 32, 0, 65, 4, 106, 65, 0, 54, 2, 0, 32, 0, 65, 8, 106, 65, 0, 54, 2, 0, 32, 0, 32, 1, 106, 34, 2, 65, 12, 107, 65, 0, 54, 2, 0, 32, 2, 65, 8, 107, 65, 0, 54, 2, 0, 32, 1, 65, 24, 77, 13, 0, 32, 0, 65, 12, 106, 65, 0, 54, 2, 0, 32, 0, 65, 16, 106, 65, 0, 54, 2, 0, 32, 0, 65, 20, 106, 65, 0, 54, 2, 0, 32, 0, 65, 24, 106, 65, 0, 54, 2, 0, 32, 0, 32, 1, 106, 34, 2, 65, 28, 107, 65, 0, 54, 2, 0, 32, 2, 65, 24, 107, 65, 0, 54, 2, 0, 32, 2, 65, 20, 107, 65, 0, 54, 2, 0, 32, 2, 65, 16, 107, 65, 0, 54, 2, 0, 32, 0, 32, 0, 65, 4, 113, 65, 24, 106, 34, 2, 106, 33, 0, 32, 1, 32, 2, 107, 33, 1, 3, 64, 32, 1, 65, 32, 79, 4, 64, 32, 0, 66, 0, 55, 3, 0, 32, 0, 65, 8, 106, 66, 0, 55, 3, 0, 32, 0, 65, 16, 106, 66, 0, 55, 3, 0, 32, 0, 65, 24, 106, 66, 0, 55, 3, 0, 32, 1, 65, 32, 107, 33, 1, 32, 0, 65, 32, 106, 33, 0, 12, 1, 11, 11, 11, 11, 178, 1, 1, 3, 127, 32, 1, 65, 240, 255, 255, 255, 3, 32, 2, 118, 75, 4, 64, 65, 144, 1, 65, 192, 1, 65, 23, 65, 56, 16, 0, 0, 11, 32, 1, 32, 2, 116, 34, 3, 65, 0, 16, 10, 34, 2, 32, 3, 16, 13, 32, 0, 69, 4, 64, 65, 12, 65, 2, 16, 10, 34, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 1, 32, 1, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 11, 32, 0, 65, 0, 54, 2, 0, 32, 0, 65, 0, 54, 2, 4, 32, 0, 65, 0, 54, 2, 8, 32, 2, 34, 1, 32, 0, 40, 2, 0, 34, 4, 71, 4, 64, 32, 1, 65, 172, 3, 75, 4, 64, 32, 1, 65, 16, 107, 34, 5, 32, 5, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 4, 16, 12, 11, 32, 0, 32, 1, 54, 2, 0, 32, 0, 32, 2, 54, 2, 4, 32, 0, 32, 3, 54, 2, 8, 32, 0, 11, 46, 1, 2, 127, 65, 12, 65, 5, 16, 10, 34, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 1, 32, 1, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 0, 65, 128, 2, 65, 3, 16, 14, 11, 9, 0, 65, 63, 32, 0, 121, 167, 107, 11, 49, 1, 2, 127, 65, 63, 32, 1, 121, 167, 107, 33, 2, 3, 64, 65, 63, 32, 0, 121, 167, 107, 32, 2, 107, 34, 3, 65, 0, 78, 4, 64, 32, 0, 32, 1, 32, 3, 172, 134, 133, 33, 0, 12, 1, 11, 11, 32, 0, 11, 40, 0, 32, 1, 32, 0, 40, 2, 8, 79, 4, 64, 65, 128, 2, 65, 192, 2, 65, 163, 1, 65, 44, 16, 0, 0, 11, 32, 1, 32, 0, 40, 2, 4, 106, 65, 0, 58, 0, 0, 11, 38, 0, 32, 1, 32, 0, 40, 2, 8, 79, 4, 64, 65, 128, 2, 65, 192, 2, 65, 152, 1, 65, 44, 16, 0, 0, 11, 32, 1, 32, 0, 40, 2, 4, 106, 45, 0, 0, 11, 254, 5, 2, 1, 127, 4, 126, 32, 0, 69, 4, 64, 65, 232, 0, 65, 6, 16, 10, 34, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 5, 32, 5, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 11, 32, 0, 65, 0, 54, 2, 0, 32, 0, 65, 0, 54, 2, 4, 32, 0, 65, 0, 54, 2, 8, 32, 0, 66, 0, 55, 3, 16, 32, 0, 66, 0, 55, 3, 24, 32, 0, 66, 0, 55, 3, 32, 32, 0, 66, 0, 55, 3, 40, 32, 0, 66, 0, 55, 3, 48, 32, 0, 66, 0, 55, 3, 56, 32, 0, 66, 0, 55, 3, 64, 32, 0, 66, 0, 55, 3, 72, 32, 0, 66, 0, 55, 3, 80, 32, 0, 66, 0, 55, 3, 88, 32, 0, 66, 0, 55, 3, 96, 32, 0, 32, 2, 173, 55, 3, 80, 32, 0, 32, 3, 173, 55, 3, 88, 65, 12, 65, 4, 16, 10, 34, 2, 65, 172, 3, 75, 4, 64, 32, 2, 65, 16, 107, 34, 3, 32, 3, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 2, 32, 4, 65, 0, 16, 14, 33, 2, 32, 0, 40, 2, 0, 16, 12, 32, 0, 32, 2, 54, 2, 0, 32, 0, 32, 4, 54, 2, 4, 32, 0, 66, 1, 32, 1, 173, 134, 66, 1, 125, 55, 3, 96, 32, 0, 66, 243, 130, 183, 218, 216, 230, 232, 30, 55, 3, 72, 35, 4, 69, 4, 64, 65, 0, 33, 2, 3, 64, 32, 2, 65, 128, 2, 72, 4, 64, 32, 2, 65, 255, 1, 113, 173, 33, 6, 32, 0, 41, 3, 72, 34, 7, 33, 8, 65, 63, 32, 7, 121, 167, 107, 33, 1, 3, 64, 65, 63, 32, 6, 121, 167, 107, 32, 1, 107, 34, 3, 65, 0, 78, 4, 64, 32, 6, 32, 8, 32, 3, 172, 134, 133, 33, 6, 12, 1, 11, 11, 65, 0, 33, 4, 3, 64, 32, 4, 32, 0, 40, 2, 4, 65, 1, 107, 72, 4, 64, 32, 6, 66, 8, 134, 33, 6, 32, 0, 41, 3, 72, 34, 7, 33, 8, 65, 63, 32, 7, 121, 167, 107, 33, 1, 3, 64, 65, 63, 32, 6, 121, 167, 107, 32, 1, 107, 34, 3, 65, 0, 78, 4, 64, 32, 6, 32, 8, 32, 3, 172, 134, 133, 33, 6, 12, 1, 11, 11, 32, 4, 65, 1, 106, 33, 4, 12, 1, 11, 11, 35, 6, 40, 2, 4, 32, 2, 65, 3, 116, 106, 32, 6, 55, 3, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 65, 63, 32, 0, 41, 3, 72, 121, 167, 107, 172, 33, 7, 65, 0, 33, 2, 3, 64, 32, 2, 65, 128, 2, 72, 4, 64, 35, 5, 33, 1, 32, 2, 172, 32, 7, 134, 34, 8, 33, 6, 65, 63, 32, 0, 41, 3, 72, 34, 9, 121, 167, 107, 33, 3, 3, 64, 65, 63, 32, 6, 121, 167, 107, 32, 3, 107, 34, 4, 65, 0, 78, 4, 64, 32, 6, 32, 9, 32, 4, 172, 134, 133, 33, 6, 12, 1, 11, 11, 32, 1, 40, 2, 4, 32, 2, 65, 3, 116, 106, 32, 6, 32, 8, 132, 55, 3, 0, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 65, 1, 36, 4, 11, 32, 0, 66, 0, 55, 3, 24, 32, 0, 66, 0, 55, 3, 32, 65, 0, 33, 2, 3, 64, 32, 2, 32, 0, 40, 2, 4, 72, 4, 64, 32, 0, 40, 2, 0, 32, 2, 16, 18, 32, 2, 65, 1, 106, 33, 2, 12, 1, 11, 11, 32, 0, 66, 0, 55, 3, 40, 32, 0, 65, 0, 54, 2, 8, 32, 0, 66, 0, 55, 3, 16, 32, 0, 66, 0, 55, 3, 40, 32, 0, 40, 2, 0, 32, 0, 40, 2, 8, 16, 19, 33, 1, 32, 0, 40, 2, 8, 32, 0, 40, 2, 0, 40, 2, 4, 106, 65, 1, 58, 0, 0, 32, 0, 32, 0, 41, 3, 40, 35, 6, 40, 2, 4, 32, 1, 65, 3, 116, 106, 41, 3, 0, 133, 55, 3, 40, 32, 0, 32, 0, 40, 2, 8, 65, 1, 106, 32, 0, 40, 2, 4, 111, 54, 2, 8, 32, 0, 35, 5, 40, 2, 4, 32, 0, 41, 3, 40, 34, 6, 66, 45, 136, 167, 65, 3, 116, 106, 41, 3, 0, 32, 6, 66, 8, 134, 66, 1, 132, 133, 55, 3, 40, 32, 0, 11, 38, 1, 1, 127, 32, 0, 40, 2, 0, 34, 0, 65, 172, 3, 75, 4, 64, 32, 0, 65, 16, 107, 34, 1, 32, 1, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 0, 11, 55, 1, 2, 127, 32, 1, 32, 0, 40, 2, 0, 34, 2, 71, 4, 64, 32, 1, 65, 172, 3, 75, 4, 64, 32, 1, 65, 16, 107, 34, 3, 32, 3, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 2, 16, 12, 11, 32, 0, 32, 1, 54, 2, 0, 11, 7, 0, 32, 0, 40, 2, 4, 11, 9, 0, 32, 0, 32, 1, 54, 2, 4, 11, 7, 0, 32, 0, 40, 2, 8, 11, 9, 0, 32, 0, 32, 1, 54, 2, 8, 11, 7, 0, 32, 0, 41, 3, 16, 11, 9, 0, 32, 0, 32, 1, 55, 3, 16, 11, 7, 0, 32, 0, 41, 3, 24, 11, 9, 0, 32, 0, 32, 1, 55, 3, 24, 11, 7, 0, 32, 0, 41, 3, 32, 11, 9, 0, 32, 0, 32, 1, 55, 3, 32, 11, 7, 0, 32, 0, 41, 3, 40, 11, 9, 0, 32, 0, 32, 1, 55, 3, 40, 11, 7, 0, 32, 0, 41, 3, 48, 11, 9, 0, 32, 0, 32, 1, 55, 3, 48, 11, 7, 0, 32, 0, 41, 3, 56, 11, 9, 0, 32, 0, 32, 1, 55, 3, 56, 11, 7, 0, 32, 0, 41, 3, 64, 11, 9, 0, 32, 0, 32, 1, 55, 3, 64, 11, 7, 0, 32, 0, 41, 3, 72, 11, 9, 0, 32, 0, 32, 1, 55, 3, 72, 11, 7, 0, 32, 0, 41, 3, 80, 11, 9, 0, 32, 0, 32, 1, 55, 3, 80, 11, 7, 0, 32, 0, 41, 3, 88, 11, 9, 0, 32, 0, 32, 1, 55, 3, 88, 11, 7, 0, 32, 0, 41, 3, 96, 11, 9, 0, 32, 0, 32, 1, 55, 3, 96, 11, 172, 4, 2, 5, 127, 1, 126, 32, 2, 65, 172, 3, 75, 4, 64, 32, 2, 65, 16, 107, 34, 4, 32, 4, 40, 2, 4, 65, 1, 106, 54, 2, 4, 11, 32, 2, 33, 4, 65, 0, 33, 2, 32, 1, 40, 2, 8, 33, 5, 32, 1, 40, 2, 4, 33, 6, 3, 64, 2, 127, 65, 0, 33, 3, 3, 64, 32, 3, 32, 5, 72, 4, 64, 32, 3, 32, 6, 106, 45, 0, 0, 33, 1, 32, 0, 40, 2, 0, 32, 0, 40, 2, 8, 16, 19, 33, 7, 32, 0, 40, 2, 8, 32, 0, 40, 2, 0, 40, 2, 4, 106, 32, 1, 58, 0, 0, 32, 0, 32, 0, 41, 3, 40, 35, 6, 40, 2, 4, 32, 7, 65, 3, 116, 106, 41, 3, 0, 133, 55, 3, 40, 32, 0, 32, 0, 40, 2, 8, 65, 1, 106, 32, 0, 40, 2, 4, 111, 54, 2, 8, 32, 0, 35, 5, 40, 2, 4, 32, 0, 41, 3, 40, 34, 8, 66, 45, 136, 167, 65, 3, 116, 106, 41, 3, 0, 32, 1, 173, 32, 8, 66, 8, 134, 132, 133, 55, 3, 40, 32, 0, 32, 0, 41, 3, 16, 66, 1, 124, 55, 3, 16, 32, 0, 32, 0, 41, 3, 24, 66, 1, 124, 55, 3, 24, 32, 0, 41, 3, 16, 32, 0, 41, 3, 80, 90, 4, 127, 32, 0, 41, 3, 40, 32, 0, 41, 3, 96, 131, 80, 5, 65, 0, 11, 4, 127, 65, 1, 5, 32, 0, 41, 3, 16, 32, 0, 41, 3, 88, 90, 11, 4, 64, 32, 0, 32, 0, 41, 3, 32, 55, 3, 48, 32, 0, 32, 0, 41, 3, 16, 55, 3, 56, 32, 0, 32, 0, 41, 3, 40, 55, 3, 64, 65, 0, 33, 1, 3, 64, 32, 1, 32, 0, 40, 2, 4, 72, 4, 64, 32, 0, 40, 2, 0, 32, 1, 16, 18, 32, 1, 65, 1, 106, 33, 1, 12, 1, 11, 11, 32, 0, 66, 0, 55, 3, 40, 32, 0, 65, 0, 54, 2, 8, 32, 0, 66, 0, 55, 3, 16, 32, 0, 66, 0, 55, 3, 40, 32, 0, 40, 2, 0, 32, 0, 40, 2, 8, 16, 19, 33, 1, 32, 0, 40, 2, 8, 32, 0, 40, 2, 0, 40, 2, 4, 106, 65, 1, 58, 0, 0, 32, 0, 32, 0, 41, 3, 40, 35, 6, 40, 2, 4, 32, 1, 65, 3, 116, 106, 41, 3, 0, 133, 55, 3, 40, 32, 0, 32, 0, 40, 2, 8, 65, 1, 106, 32, 0, 40, 2, 4, 111, 54, 2, 8, 32, 0, 35, 5, 40, 2, 4, 32, 0, 41, 3, 40, 34, 8, 66, 45, 136, 167, 65, 3, 116, 106, 41, 3, 0, 32, 8, 66, 8, 134, 66, 1, 132, 133, 55, 3, 40, 32, 3, 65, 1, 106, 12, 3, 11, 32, 3, 65, 1, 106, 33, 3, 12, 1, 11, 11, 65, 127, 11, 34, 1, 65, 0, 78, 4, 64, 32, 5, 32, 1, 107, 33, 5, 32, 1, 32, 6, 106, 33, 6, 32, 2, 34, 1, 65, 1, 106, 33, 2, 32, 4, 40, 2, 4, 32, 1, 65, 2, 116, 106, 32, 0, 41, 3, 56, 62, 2, 0, 12, 1, 11, 11, 32, 4, 11, 10, 0, 16, 15, 36, 5, 16, 15, 36, 6, 11, 3, 0, 1, 11, 73, 1, 2, 127, 32, 0, 40, 2, 4, 34, 1, 65, 255, 255, 255, 255, 0, 113, 34, 2, 65, 1, 70, 4, 64, 32, 0, 65, 16, 106, 16, 53, 32, 0, 32, 0, 40, 2, 0, 65, 1, 114, 54, 2, 0, 35, 0, 32, 0, 16, 2, 5, 32, 0, 32, 2, 65, 1, 107, 32, 1, 65, 128, 128, 128, 128, 127, 113, 114, 54, 2, 4, 11, 11, 58, 0, 2, 64, 2, 64, 2, 64, 32, 0, 65, 8, 107, 40, 2, 0, 14, 7, 0, 0, 1, 1, 1, 1, 1, 2, 11, 15, 11, 32, 0, 40, 2, 0, 34, 0, 4, 64, 32, 0, 65, 172, 3, 79, 4, 64, 32, 0, 65, 16, 107, 16, 52, 11, 11, 15, 11, 0, 11, 11, 137, 3, 7, 0, 65, 16, 11, 55, 40, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 40, 0, 0, 0, 97, 0, 108, 0, 108, 0, 111, 0, 99, 0, 97, 0, 116, 0, 105, 0, 111, 0, 110, 0, 32, 0, 116, 0, 111, 0, 111, 0, 32, 0, 108, 0, 97, 0, 114, 0, 103, 0, 101, 0, 65, 208, 0, 11, 45, 30, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 30, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 114, 0, 116, 0, 47, 0, 116, 0, 108, 0, 115, 0, 102, 0, 46, 0, 116, 0, 115, 0, 65, 128, 1, 11, 43, 28, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 28, 0, 0, 0, 73, 0, 110, 0, 118, 0, 97, 0, 108, 0, 105, 0, 100, 0, 32, 0, 108, 0, 101, 0, 110, 0, 103, 0, 116, 0, 104, 0, 65, 176, 1, 11, 53, 38, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 38, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 97, 0, 114, 0, 114, 0, 97, 0, 121, 0, 98, 0, 117, 0, 102, 0, 102, 0, 101, 0, 114, 0, 46, 0, 116, 0, 115, 0, 65, 240, 1, 11, 51, 36, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 36, 0, 0, 0, 73, 0, 110, 0, 100, 0, 101, 0, 120, 0, 32, 0, 111, 0, 117, 0, 116, 0, 32, 0, 111, 0, 102, 0, 32, 0, 114, 0, 97, 0, 110, 0, 103, 0, 101, 0, 65, 176, 2, 11, 51, 36, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 36, 0, 0, 0, 126, 0, 108, 0, 105, 0, 98, 0, 47, 0, 116, 0, 121, 0, 112, 0, 101, 0, 100, 0, 97, 0, 114, 0, 114, 0, 97, 0, 121, 0, 46, 0, 116, 0, 115, 0, 65, 240, 2, 11, 53, 7, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 16, 0, 0, 0, 0, 0, 0, 0, 145, 4, 0, 0, 2, 0, 0, 0, 49, 0, 0, 0, 2, 0, 0, 0, 17, 1, 0, 0, 2, 0, 0, 0, 16, 0, 34, 16, 115, 111, 117, 114, 99, 101, 77, 97, 112, 112, 105, 110, 103, 85, 82, 76, 16, 46, 47, 114, 97, 98, 105, 110, 46, 119, 97, 115, 109, 46, 109, 97, 112]);
      return instantiate(new Response(new Blob([wasm], { type: "application/wasm" })), imp);
    }
    module2.exports = loadWebAssembly;
  }
});

// ../../node_modules/rabin-wasm/src/index.js
var require_src9 = __commonJS({
  "../../node_modules/rabin-wasm/src/index.js"(exports2, module2) {
    var Rabin = require_rabin();
    var getRabin = require_rabin_wasm();
    var create2 = async (avg, min, max, windowSize, polynomial) => {
      const compiled = await getRabin();
      return new Rabin(compiled, avg, min, max, windowSize, polynomial);
    };
    module2.exports = {
      Rabin,
      create: create2
    };
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/chunker/rabin.js
var require_rabin2 = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/chunker/rabin.js"(exports2, module2) {
    "use strict";
    var BufferList = require_BufferList();
    var { create: create2 } = require_src9();
    var errcode = require_err_code();
    module2.exports = async function* rabinChunker(source, options) {
      let min, max, avg;
      if (options.minChunkSize && options.maxChunkSize && options.avgChunkSize) {
        avg = options.avgChunkSize;
        min = options.minChunkSize;
        max = options.maxChunkSize;
      } else if (!options.avgChunkSize) {
        throw errcode(new Error("please specify an average chunk size"), "ERR_INVALID_AVG_CHUNK_SIZE");
      } else {
        avg = options.avgChunkSize;
        min = avg / 3;
        max = avg + avg / 2;
      }
      if (min < 16) {
        throw errcode(new Error("rabin min must be greater than 16"), "ERR_INVALID_MIN_CHUNK_SIZE");
      }
      if (max < min) {
        max = min;
      }
      if (avg < min) {
        avg = min;
      }
      const sizepow = Math.floor(Math.log2(avg));
      for await (const chunk of rabin(source, {
        min,
        max,
        bits: sizepow,
        window: options.window,
        polynomial: options.polynomial
      })) {
        yield chunk;
      }
    };
    async function* rabin(source, options) {
      const r = await create2(options.bits, options.min, options.max, options.window);
      const buffers = new BufferList();
      for await (const chunk of source) {
        buffers.append(chunk);
        const sizes = r.fingerprint(chunk);
        for (let i = 0; i < sizes.length; i++) {
          const size = sizes[i];
          const buf = buffers.slice(0, size);
          buffers.consume(size);
          yield buf;
        }
      }
      if (buffers.length) {
        yield buffers.slice(0);
      }
    }
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/chunker/fixed-size.js
var require_fixed_size = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/chunker/fixed-size.js"(exports2, module2) {
    "use strict";
    var BufferList = require_BufferList();
    module2.exports = async function* fixedSizeChunker(source, options) {
      let bl = new BufferList();
      let currentLength = 0;
      let emitted = false;
      const maxChunkSize = options.maxChunkSize;
      for await (const buffer of source) {
        bl.append(buffer);
        currentLength += buffer.length;
        while (currentLength >= maxChunkSize) {
          yield bl.slice(0, maxChunkSize);
          emitted = true;
          if (maxChunkSize === bl.length) {
            bl = new BufferList();
            currentLength = 0;
          } else {
            const newBl = new BufferList();
            newBl.append(bl.shallowSlice(maxChunkSize));
            bl = newBl;
            currentLength -= maxChunkSize;
          }
        }
      }
      if (!emitted || currentLength) {
        yield bl.slice(0, currentLength);
      }
    };
  }
});

// ../../node_modules/ipfs-unixfs-importer/node_modules/uint8arrays/util/bases.js
var require_bases2 = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/node_modules/uint8arrays/util/bases.js"(exports2, module2) {
    "use strict";
    var { bases: bases2 } = (init_basics(), basics_exports);
    function createCodec2(name3, prefix, encode5, decode7) {
      return {
        name: name3,
        prefix,
        encoder: {
          name: name3,
          prefix,
          encode: encode5
        },
        decoder: {
          decode: decode7
        }
      };
    }
    var string2 = createCodec2("utf8", "u", (buf) => {
      const decoder = new TextDecoder("utf8");
      return "u" + decoder.decode(buf);
    }, (str) => {
      const encoder = new TextEncoder();
      return encoder.encode(str.substring(1));
    });
    var ascii2 = createCodec2("ascii", "a", (buf) => {
      let string3 = "a";
      for (let i = 0; i < buf.length; i++) {
        string3 += String.fromCharCode(buf[i]);
      }
      return string3;
    }, (str) => {
      str = str.substring(1);
      const buf = new Uint8Array(str.length);
      for (let i = 0; i < str.length; i++) {
        buf[i] = str.charCodeAt(i);
      }
      return buf;
    });
    var BASES2 = {
      "utf8": string2,
      "utf-8": string2,
      "hex": bases2.base16,
      "latin1": ascii2,
      "ascii": ascii2,
      "binary": ascii2,
      ...bases2
    };
    module2.exports = BASES2;
  }
});

// ../../node_modules/ipfs-unixfs-importer/node_modules/uint8arrays/from-string.js
var require_from_string2 = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/node_modules/uint8arrays/from-string.js"(exports2, module2) {
    "use strict";
    var bases2 = require_bases2();
    function fromString3(string2, encoding = "utf8") {
      const base3 = bases2[encoding];
      if (!base3) {
        throw new Error(`Unsupported encoding "${encoding}"`);
      }
      return base3.decoder.decode(`${base3.prefix}${string2}`);
    }
    module2.exports = fromString3;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dag-builder/validate-chunks.js
var require_validate_chunks = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dag-builder/validate-chunks.js"(exports2, module2) {
    "use strict";
    var errCode = require_err_code();
    var uint8ArrayFromString = require_from_string2();
    async function* validateChunks(source) {
      for await (const content of source) {
        if (content.length === void 0) {
          throw errCode(new Error("Content was invalid"), "ERR_INVALID_CONTENT");
        }
        if (typeof content === "string" || content instanceof String) {
          yield uint8ArrayFromString(content.toString());
        } else if (Array.isArray(content)) {
          yield Uint8Array.from(content);
        } else if (content instanceof Uint8Array) {
          yield content;
        } else {
          throw errCode(new Error("Content was invalid"), "ERR_INVALID_CONTENT");
        }
      }
    }
    module2.exports = validateChunks;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dag-builder/index.js
var require_dag_builder = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dag-builder/index.js"(exports2, module2) {
    "use strict";
    var dirBuilder = require_dir();
    var fileBuilder = require_file();
    var errCode = require_err_code();
    function isIterable(thing) {
      return Symbol.iterator in thing;
    }
    function isAsyncIterable(thing) {
      return Symbol.asyncIterator in thing;
    }
    function contentAsAsyncIterable(content) {
      try {
        if (content instanceof Uint8Array) {
          return async function* () {
            yield content;
          }();
        } else if (isIterable(content)) {
          return async function* () {
            yield* content;
          }();
        } else if (isAsyncIterable(content)) {
          return content;
        }
      } catch {
        throw errCode(new Error("Content was invalid"), "ERR_INVALID_CONTENT");
      }
      throw errCode(new Error("Content was invalid"), "ERR_INVALID_CONTENT");
    }
    async function* dagBuilder(source, block, options) {
      for await (const entry of source) {
        if (entry.path) {
          if (entry.path.substring(0, 2) === "./") {
            options.wrapWithDirectory = true;
          }
          entry.path = entry.path.split("/").filter((path) => path && path !== ".").join("/");
        }
        if (entry.content) {
          let chunker;
          if (typeof options.chunker === "function") {
            chunker = options.chunker;
          } else if (options.chunker === "rabin") {
            chunker = require_rabin2();
          } else {
            chunker = require_fixed_size();
          }
          let chunkValidator;
          if (typeof options.chunkValidator === "function") {
            chunkValidator = options.chunkValidator;
          } else {
            chunkValidator = require_validate_chunks();
          }
          const file = {
            path: entry.path,
            mtime: entry.mtime,
            mode: entry.mode,
            content: chunker(chunkValidator(contentAsAsyncIterable(entry.content), options), options)
          };
          yield () => fileBuilder(file, block, options);
        } else if (entry.path) {
          const dir = {
            path: entry.path,
            mtime: entry.mtime,
            mode: entry.mode
          };
          yield () => dirBuilder(dir, block, options);
        } else {
          throw new Error("Import candidate must have content or path or both");
        }
      }
    }
    module2.exports = dagBuilder;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dir.js
var require_dir2 = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dir.js"(exports2, module2) {
    "use strict";
    var Dir = class {
      constructor(props, options) {
        this.options = options || {};
        this.root = props.root;
        this.dir = props.dir;
        this.path = props.path;
        this.dirty = props.dirty;
        this.flat = props.flat;
        this.parent = props.parent;
        this.parentKey = props.parentKey;
        this.unixfs = props.unixfs;
        this.mode = props.mode;
        this.mtime = props.mtime;
        this.cid = void 0;
        this.size = void 0;
      }
      async put(name3, value) {
      }
      get(name3) {
        return Promise.resolve(this);
      }
      async *eachChildSeries() {
      }
      async *flush(block) {
      }
    };
    module2.exports = Dir;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dir-flat.js
var require_dir_flat = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dir-flat.js"(exports2, module2) {
    "use strict";
    var {
      DAGLink,
      DAGNode
    } = require_src8();
    var { UnixFS } = require_src5();
    var Dir = require_dir2();
    var persist = require_persist();
    var DirFlat = class extends Dir {
      constructor(props, options) {
        super(props, options);
        this._children = {};
      }
      async put(name3, value) {
        this.cid = void 0;
        this.size = void 0;
        this._children[name3] = value;
      }
      get(name3) {
        return Promise.resolve(this._children[name3]);
      }
      childCount() {
        return Object.keys(this._children).length;
      }
      directChildrenCount() {
        return this.childCount();
      }
      onlyChild() {
        return this._children[Object.keys(this._children)[0]];
      }
      async *eachChildSeries() {
        const keys = Object.keys(this._children);
        for (let i = 0; i < keys.length; i++) {
          const key = keys[i];
          yield {
            key,
            child: this._children[key]
          };
        }
      }
      async *flush(block) {
        const children = Object.keys(this._children);
        const links = [];
        for (let i = 0; i < children.length; i++) {
          let child = this._children[children[i]];
          if (child instanceof Dir) {
            for await (const entry of child.flush(block)) {
              child = entry;
              yield child;
            }
          }
          if (child.size != null && child.cid) {
            links.push(new DAGLink(children[i], child.size, child.cid));
          }
        }
        const unixfs = new UnixFS({
          type: "directory",
          mtime: this.mtime,
          mode: this.mode
        });
        const node = new DAGNode(unixfs.marshal(), links);
        const buffer = node.serialize();
        const cid = await persist(buffer, block, this.options);
        const size = buffer.length + node.Links.reduce((acc, curr) => acc + curr.Tsize, 0);
        this.cid = cid;
        this.size = size;
        yield {
          cid,
          unixfs,
          path: this.path,
          size
        };
      }
    };
    module2.exports = DirFlat;
  }
});

// ../../node_modules/sparse-array/index.js
var require_sparse_array = __commonJS({
  "../../node_modules/sparse-array/index.js"(exports2, module2) {
    "use strict";
    var BITS_PER_BYTE = 7;
    module2.exports = class SparseArray {
      constructor() {
        this._bitArrays = [];
        this._data = [];
        this._length = 0;
        this._changedLength = false;
        this._changedData = false;
      }
      set(index, value) {
        let pos = this._internalPositionFor(index, false);
        if (value === void 0) {
          if (pos !== -1) {
            this._unsetInternalPos(pos);
            this._unsetBit(index);
            this._changedLength = true;
            this._changedData = true;
          }
        } else {
          let needsSort = false;
          if (pos === -1) {
            pos = this._data.length;
            this._setBit(index);
            this._changedData = true;
          } else {
            needsSort = true;
          }
          this._setInternalPos(pos, index, value, needsSort);
          this._changedLength = true;
        }
      }
      unset(index) {
        this.set(index, void 0);
      }
      get(index) {
        this._sortData();
        const pos = this._internalPositionFor(index, true);
        if (pos === -1) {
          return void 0;
        }
        return this._data[pos][1];
      }
      push(value) {
        this.set(this.length, value);
        return this.length;
      }
      get length() {
        this._sortData();
        if (this._changedLength) {
          const last = this._data[this._data.length - 1];
          this._length = last ? last[0] + 1 : 0;
          this._changedLength = false;
        }
        return this._length;
      }
      forEach(iterator) {
        let i = 0;
        while (i < this.length) {
          iterator(this.get(i), i, this);
          i++;
        }
      }
      map(iterator) {
        let i = 0;
        let mapped = new Array(this.length);
        while (i < this.length) {
          mapped[i] = iterator(this.get(i), i, this);
          i++;
        }
        return mapped;
      }
      reduce(reducer, initialValue) {
        let i = 0;
        let acc = initialValue;
        while (i < this.length) {
          const value = this.get(i);
          acc = reducer(acc, value, i);
          i++;
        }
        return acc;
      }
      find(finder) {
        let i = 0, found, last;
        while (i < this.length && !found) {
          last = this.get(i);
          found = finder(last);
          i++;
        }
        return found ? last : void 0;
      }
      _internalPositionFor(index, noCreate) {
        const bytePos = this._bytePosFor(index, noCreate);
        if (bytePos >= this._bitArrays.length) {
          return -1;
        }
        const byte = this._bitArrays[bytePos];
        const bitPos = index - bytePos * BITS_PER_BYTE;
        const exists = (byte & 1 << bitPos) > 0;
        if (!exists) {
          return -1;
        }
        const previousPopCount = this._bitArrays.slice(0, bytePos).reduce(popCountReduce, 0);
        const mask = ~(4294967295 << bitPos + 1);
        const bytePopCount = popCount(byte & mask);
        const arrayPos = previousPopCount + bytePopCount - 1;
        return arrayPos;
      }
      _bytePosFor(index, noCreate) {
        const bytePos = Math.floor(index / BITS_PER_BYTE);
        const targetLength = bytePos + 1;
        while (!noCreate && this._bitArrays.length < targetLength) {
          this._bitArrays.push(0);
        }
        return bytePos;
      }
      _setBit(index) {
        const bytePos = this._bytePosFor(index, false);
        this._bitArrays[bytePos] |= 1 << index - bytePos * BITS_PER_BYTE;
      }
      _unsetBit(index) {
        const bytePos = this._bytePosFor(index, false);
        this._bitArrays[bytePos] &= ~(1 << index - bytePos * BITS_PER_BYTE);
      }
      _setInternalPos(pos, index, value, needsSort) {
        const data = this._data;
        const elem = [index, value];
        if (needsSort) {
          this._sortData();
          data[pos] = elem;
        } else {
          if (data.length) {
            if (data[data.length - 1][0] >= index) {
              data.push(elem);
            } else if (data[0][0] <= index) {
              data.unshift(elem);
            } else {
              const randomIndex = Math.round(data.length / 2);
              this._data = data.slice(0, randomIndex).concat(elem).concat(data.slice(randomIndex));
            }
          } else {
            this._data.push(elem);
          }
          this._changedData = true;
          this._changedLength = true;
        }
      }
      _unsetInternalPos(pos) {
        this._data.splice(pos, 1);
      }
      _sortData() {
        if (this._changedData) {
          this._data.sort(sortInternal);
        }
        this._changedData = false;
      }
      bitField() {
        const bytes = [];
        let pendingBitsForResultingByte = 8;
        let pendingBitsForNewByte = 0;
        let resultingByte = 0;
        let newByte;
        const pending = this._bitArrays.slice();
        while (pending.length || pendingBitsForNewByte) {
          if (pendingBitsForNewByte === 0) {
            newByte = pending.shift();
            pendingBitsForNewByte = 7;
          }
          const usingBits = Math.min(pendingBitsForNewByte, pendingBitsForResultingByte);
          const mask = ~(255 << usingBits);
          const masked = newByte & mask;
          resultingByte |= masked << 8 - pendingBitsForResultingByte;
          newByte = newByte >>> usingBits;
          pendingBitsForNewByte -= usingBits;
          pendingBitsForResultingByte -= usingBits;
          if (!pendingBitsForResultingByte || !pendingBitsForNewByte && !pending.length) {
            bytes.push(resultingByte);
            resultingByte = 0;
            pendingBitsForResultingByte = 8;
          }
        }
        for (var i = bytes.length - 1; i > 0; i--) {
          const value = bytes[i];
          if (value === 0) {
            bytes.pop();
          } else {
            break;
          }
        }
        return bytes;
      }
      compactArray() {
        this._sortData();
        return this._data.map(valueOnly);
      }
    };
    function popCountReduce(count, byte) {
      return count + popCount(byte);
    }
    function popCount(_v) {
      let v = _v;
      v = v - (v >> 1 & 1431655765);
      v = (v & 858993459) + (v >> 2 & 858993459);
      return (v + (v >> 4) & 252645135) * 16843009 >> 24;
    }
    function sortInternal(a, b) {
      return a[0] - b[0];
    }
    function valueOnly(elem) {
      return elem[1];
    }
  }
});

// ../../node_modules/hamt-sharding/src/bucket.js
var require_bucket = __commonJS({
  "../../node_modules/hamt-sharding/src/bucket.js"(exports2, module2) {
    "use strict";
    var SparseArray = require_sparse_array();
    var { fromString: uint8ArrayFromString } = (init_from_string(), from_string_exports);
    var Bucket = class {
      constructor(options, parent, posAtParent = 0) {
        this._options = options;
        this._popCount = 0;
        this._parent = parent;
        this._posAtParent = posAtParent;
        this._children = new SparseArray();
        this.key = null;
      }
      async put(key, value) {
        const place = await this._findNewBucketAndPos(key);
        await place.bucket._putAt(place, key, value);
      }
      async get(key) {
        const child = await this._findChild(key);
        if (child) {
          return child.value;
        }
      }
      async del(key) {
        const place = await this._findPlace(key);
        const child = place.bucket._at(place.pos);
        if (child && child.key === key) {
          place.bucket._delAt(place.pos);
        }
      }
      leafCount() {
        const children = this._children.compactArray();
        return children.reduce((acc, child) => {
          if (child instanceof Bucket) {
            return acc + child.leafCount();
          }
          return acc + 1;
        }, 0);
      }
      childrenCount() {
        return this._children.length;
      }
      onlyChild() {
        return this._children.get(0);
      }
      *eachLeafSeries() {
        const children = this._children.compactArray();
        for (const child of children) {
          if (child instanceof Bucket) {
            yield* child.eachLeafSeries();
          } else {
            yield child;
          }
        }
        return [];
      }
      serialize(map, reduce) {
        const acc = [];
        return reduce(this._children.reduce((acc2, child, index) => {
          if (child) {
            if (child instanceof Bucket) {
              acc2.push(child.serialize(map, reduce));
            } else {
              acc2.push(map(child, index));
            }
          }
          return acc2;
        }, acc));
      }
      asyncTransform(asyncMap, asyncReduce) {
        return asyncTransformBucket(this, asyncMap, asyncReduce);
      }
      toJSON() {
        return this.serialize(mapNode, reduceNodes);
      }
      prettyPrint() {
        return JSON.stringify(this.toJSON(), null, "  ");
      }
      tableSize() {
        return Math.pow(2, this._options.bits);
      }
      async _findChild(key) {
        const result = await this._findPlace(key);
        const child = result.bucket._at(result.pos);
        if (child instanceof Bucket) {
          return void 0;
        }
        if (child && child.key === key) {
          return child;
        }
      }
      async _findPlace(key) {
        const hashValue = this._options.hash(typeof key === "string" ? uint8ArrayFromString(key) : key);
        const index = await hashValue.take(this._options.bits);
        const child = this._children.get(index);
        if (child instanceof Bucket) {
          return child._findPlace(hashValue);
        }
        return {
          bucket: this,
          pos: index,
          hash: hashValue,
          existingChild: child
        };
      }
      async _findNewBucketAndPos(key) {
        const place = await this._findPlace(key);
        if (place.existingChild && place.existingChild.key !== key) {
          const bucket = new Bucket(this._options, place.bucket, place.pos);
          place.bucket._putObjectAt(place.pos, bucket);
          const newPlace = await bucket._findPlace(place.existingChild.hash);
          newPlace.bucket._putAt(newPlace, place.existingChild.key, place.existingChild.value);
          return bucket._findNewBucketAndPos(place.hash);
        }
        return place;
      }
      _putAt(place, key, value) {
        this._putObjectAt(place.pos, {
          key,
          value,
          hash: place.hash
        });
      }
      _putObjectAt(pos, object) {
        if (!this._children.get(pos)) {
          this._popCount++;
        }
        this._children.set(pos, object);
      }
      _delAt(pos) {
        if (pos === -1) {
          throw new Error("Invalid position");
        }
        if (this._children.get(pos)) {
          this._popCount--;
        }
        this._children.unset(pos);
        this._level();
      }
      _level() {
        if (this._parent && this._popCount <= 1) {
          if (this._popCount === 1) {
            const onlyChild = this._children.find(exists);
            if (onlyChild && !(onlyChild instanceof Bucket)) {
              const hash = onlyChild.hash;
              hash.untake(this._options.bits);
              const place = {
                pos: this._posAtParent,
                hash,
                bucket: this._parent
              };
              this._parent._putAt(place, onlyChild.key, onlyChild.value);
            }
          } else {
            this._parent._delAt(this._posAtParent);
          }
        }
      }
      _at(index) {
        return this._children.get(index);
      }
    };
    function exists(o) {
      return Boolean(o);
    }
    function mapNode(node, index) {
      return node.key;
    }
    function reduceNodes(nodes) {
      return nodes;
    }
    async function asyncTransformBucket(bucket, asyncMap, asyncReduce) {
      const output = [];
      for (const child of bucket._children.compactArray()) {
        if (child instanceof Bucket) {
          await asyncTransformBucket(child, asyncMap, asyncReduce);
        } else {
          const mappedChildren = await asyncMap(child);
          output.push({
            bitField: bucket._children.bitField(),
            children: mappedChildren
          });
        }
      }
      return asyncReduce(output);
    }
    module2.exports = Bucket;
  }
});

// ../../node_modules/hamt-sharding/src/consumable-buffer.js
var require_consumable_buffer = __commonJS({
  "../../node_modules/hamt-sharding/src/consumable-buffer.js"(exports2, module2) {
    "use strict";
    var START_MASKS = [
      255,
      254,
      252,
      248,
      240,
      224,
      192,
      128
    ];
    var STOP_MASKS = [
      1,
      3,
      7,
      15,
      31,
      63,
      127,
      255
    ];
    module2.exports = class ConsumableBuffer {
      constructor(value) {
        this._value = value;
        this._currentBytePos = value.length - 1;
        this._currentBitPos = 7;
      }
      availableBits() {
        return this._currentBitPos + 1 + this._currentBytePos * 8;
      }
      totalBits() {
        return this._value.length * 8;
      }
      take(bits) {
        let pendingBits = bits;
        let result = 0;
        while (pendingBits && this._haveBits()) {
          const byte = this._value[this._currentBytePos];
          const availableBits = this._currentBitPos + 1;
          const taking = Math.min(availableBits, pendingBits);
          const value = byteBitsToInt(byte, availableBits - taking, taking);
          result = (result << taking) + value;
          pendingBits -= taking;
          this._currentBitPos -= taking;
          if (this._currentBitPos < 0) {
            this._currentBitPos = 7;
            this._currentBytePos--;
          }
        }
        return result;
      }
      untake(bits) {
        this._currentBitPos += bits;
        while (this._currentBitPos > 7) {
          this._currentBitPos -= 8;
          this._currentBytePos += 1;
        }
      }
      _haveBits() {
        return this._currentBytePos >= 0;
      }
    };
    function byteBitsToInt(byte, start, length2) {
      const mask = maskFor(start, length2);
      return (byte & mask) >>> start;
    }
    function maskFor(start, length2) {
      return START_MASKS[start] & STOP_MASKS[Math.min(length2 + start - 1, 7)];
    }
  }
});

// ../../node_modules/hamt-sharding/src/consumable-hash.js
var require_consumable_hash = __commonJS({
  "../../node_modules/hamt-sharding/src/consumable-hash.js"(exports2, module2) {
    "use strict";
    var ConsumableBuffer = require_consumable_buffer();
    var { concat: uint8ArrayConcat } = (init_concat(), concat_exports);
    function wrapHash(hashFn) {
      function hashing(value) {
        if (value instanceof InfiniteHash) {
          return value;
        } else {
          return new InfiniteHash(value, hashFn);
        }
      }
      return hashing;
    }
    var InfiniteHash = class {
      constructor(value, hashFn) {
        if (!(value instanceof Uint8Array)) {
          throw new Error("can only hash Uint8Arrays");
        }
        this._value = value;
        this._hashFn = hashFn;
        this._depth = -1;
        this._availableBits = 0;
        this._currentBufferIndex = 0;
        this._buffers = [];
      }
      async take(bits) {
        let pendingBits = bits;
        while (this._availableBits < pendingBits) {
          await this._produceMoreBits();
        }
        let result = 0;
        while (pendingBits > 0) {
          const hash = this._buffers[this._currentBufferIndex];
          const available = Math.min(hash.availableBits(), pendingBits);
          const took = hash.take(available);
          result = (result << available) + took;
          pendingBits -= available;
          this._availableBits -= available;
          if (hash.availableBits() === 0) {
            this._currentBufferIndex++;
          }
        }
        return result;
      }
      untake(bits) {
        let pendingBits = bits;
        while (pendingBits > 0) {
          const hash = this._buffers[this._currentBufferIndex];
          const availableForUntake = Math.min(hash.totalBits() - hash.availableBits(), pendingBits);
          hash.untake(availableForUntake);
          pendingBits -= availableForUntake;
          this._availableBits += availableForUntake;
          if (this._currentBufferIndex > 0 && hash.totalBits() === hash.availableBits()) {
            this._depth--;
            this._currentBufferIndex--;
          }
        }
      }
      async _produceMoreBits() {
        this._depth++;
        const value = this._depth ? uint8ArrayConcat([this._value, Uint8Array.from([this._depth])]) : this._value;
        const hashValue = await this._hashFn(value);
        const buffer = new ConsumableBuffer(hashValue);
        this._buffers.push(buffer);
        this._availableBits += buffer.availableBits();
      }
    };
    module2.exports = wrapHash;
    module2.exports.InfiniteHash = InfiniteHash;
  }
});

// ../../node_modules/hamt-sharding/src/index.js
var require_src10 = __commonJS({
  "../../node_modules/hamt-sharding/src/index.js"(exports2, module2) {
    "use strict";
    var Bucket = require_bucket();
    var wrapHash = require_consumable_hash();
    function createHAMT(options) {
      if (!options || !options.hashFn) {
        throw new Error("please define an options.hashFn");
      }
      const bucketOptions = {
        bits: options.bits || 8,
        hash: wrapHash(options.hashFn)
      };
      return new Bucket(bucketOptions);
    }
    module2.exports = {
      createHAMT,
      Bucket
    };
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/dir-sharded.js
var require_dir_sharded = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/dir-sharded.js"(exports2, module2) {
    "use strict";
    var {
      DAGLink,
      DAGNode
    } = require_src8();
    var { UnixFS } = require_src5();
    var Dir = require_dir2();
    var persist = require_persist();
    var { createHAMT, Bucket } = require_src10();
    var DirSharded = class extends Dir {
      constructor(props, options) {
        super(props, options);
        this._bucket = createHAMT({
          hashFn: options.hamtHashFn,
          bits: options.hamtBucketBits
        });
      }
      async put(name3, value) {
        await this._bucket.put(name3, value);
      }
      get(name3) {
        return this._bucket.get(name3);
      }
      childCount() {
        return this._bucket.leafCount();
      }
      directChildrenCount() {
        return this._bucket.childrenCount();
      }
      onlyChild() {
        return this._bucket.onlyChild();
      }
      async *eachChildSeries() {
        for await (const { key, value } of this._bucket.eachLeafSeries()) {
          yield {
            key,
            child: value
          };
        }
      }
      async *flush(block) {
        for await (const entry of flush(this._bucket, block, this, this.options)) {
          yield {
            ...entry,
            path: this.path
          };
        }
      }
    };
    module2.exports = DirSharded;
    async function* flush(bucket, block, shardRoot, options) {
      const children = bucket._children;
      const links = [];
      let childrenSize = 0;
      for (let i = 0; i < children.length; i++) {
        const child = children.get(i);
        if (!child) {
          continue;
        }
        const labelPrefix = i.toString(16).toUpperCase().padStart(2, "0");
        if (child instanceof Bucket) {
          let shard;
          for await (const subShard of await flush(child, block, null, options)) {
            shard = subShard;
          }
          if (!shard) {
            throw new Error("Could not flush sharded directory, no subshard found");
          }
          links.push(new DAGLink(labelPrefix, shard.size, shard.cid));
          childrenSize += shard.size;
        } else if (typeof child.value.flush === "function") {
          const dir2 = child.value;
          let flushedDir;
          for await (const entry of dir2.flush(block)) {
            flushedDir = entry;
            yield flushedDir;
          }
          const label = labelPrefix + child.key;
          links.push(new DAGLink(label, flushedDir.size, flushedDir.cid));
          childrenSize += flushedDir.size;
        } else {
          const value = child.value;
          if (!value.cid) {
            continue;
          }
          const label = labelPrefix + child.key;
          const size2 = value.size;
          links.push(new DAGLink(label, size2, value.cid));
          childrenSize += size2;
        }
      }
      const data = Uint8Array.from(children.bitField().reverse());
      const dir = new UnixFS({
        type: "hamt-sharded-directory",
        data,
        fanout: bucket.tableSize(),
        hashType: options.hamtHashCode,
        mtime: shardRoot && shardRoot.mtime,
        mode: shardRoot && shardRoot.mode
      });
      const node = new DAGNode(dir.marshal(), links);
      const buffer = node.serialize();
      const cid = await persist(buffer, block, options);
      const size = buffer.length + childrenSize;
      yield {
        cid,
        unixfs: dir,
        size
      };
    }
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/flat-to-shard.js
var require_flat_to_shard = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/flat-to-shard.js"(exports2, module2) {
    "use strict";
    var DirSharded = require_dir_sharded();
    var DirFlat = require_dir_flat();
    module2.exports = async function flatToShard(child, dir, threshold, options) {
      let newDir = dir;
      if (dir instanceof DirFlat && dir.directChildrenCount() >= threshold) {
        newDir = await convertToShard(dir, options);
      }
      const parent = newDir.parent;
      if (parent) {
        if (newDir !== dir) {
          if (child) {
            child.parent = newDir;
          }
          if (!newDir.parentKey) {
            throw new Error("No parent key found");
          }
          await parent.put(newDir.parentKey, newDir);
        }
        return flatToShard(newDir, parent, threshold, options);
      }
      return newDir;
    };
    async function convertToShard(oldDir, options) {
      const newDir = new DirSharded({
        root: oldDir.root,
        dir: true,
        parent: oldDir.parent,
        parentKey: oldDir.parentKey,
        path: oldDir.path,
        dirty: oldDir.dirty,
        flat: false,
        mtime: oldDir.mtime,
        mode: oldDir.mode
      }, options);
      for await (const { key, child } of oldDir.eachChildSeries()) {
        await newDir.put(key, child);
      }
      return newDir;
    }
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/utils/to-path-components.js
var require_to_path_components = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/utils/to-path-components.js"(exports2, module2) {
    "use strict";
    var toPathComponents = (path = "") => {
      return (path.trim().match(/([^\\^/]|\\\/)+/g) || []).filter(Boolean);
    };
    module2.exports = toPathComponents;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/tree-builder.js
var require_tree_builder = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/tree-builder.js"(exports2, module2) {
    "use strict";
    var DirFlat = require_dir_flat();
    var flatToShard = require_flat_to_shard();
    var Dir = require_dir2();
    var toPathComponents = require_to_path_components();
    async function addToTree(elem, tree, options) {
      const pathElems = toPathComponents(elem.path || "");
      const lastIndex = pathElems.length - 1;
      let parent = tree;
      let currentPath = "";
      for (let i = 0; i < pathElems.length; i++) {
        const pathElem = pathElems[i];
        currentPath += `${currentPath ? "/" : ""}${pathElem}`;
        const last = i === lastIndex;
        parent.dirty = true;
        parent.cid = void 0;
        parent.size = void 0;
        if (last) {
          await parent.put(pathElem, elem);
          tree = await flatToShard(null, parent, options.shardSplitThreshold, options);
        } else {
          let dir = await parent.get(pathElem);
          if (!dir || !(dir instanceof Dir)) {
            dir = new DirFlat({
              root: false,
              dir: true,
              parent,
              parentKey: pathElem,
              path: currentPath,
              dirty: true,
              flat: true,
              mtime: dir && dir.unixfs && dir.unixfs.mtime,
              mode: dir && dir.unixfs && dir.unixfs.mode
            }, options);
          }
          await parent.put(pathElem, dir);
          parent = dir;
        }
      }
      return tree;
    }
    async function* flushAndYield(tree, block) {
      if (!(tree instanceof Dir)) {
        if (tree && tree.unixfs && tree.unixfs.isDirectory()) {
          yield tree;
        }
        return;
      }
      yield* tree.flush(block);
    }
    async function* treeBuilder(source, block, options) {
      let tree = new DirFlat({
        root: true,
        dir: true,
        path: "",
        dirty: true,
        flat: true
      }, options);
      for await (const entry of source) {
        if (!entry) {
          continue;
        }
        tree = await addToTree(entry, tree, options);
        if (!entry.unixfs || !entry.unixfs.isDirectory()) {
          yield entry;
        }
      }
      if (options.wrapWithDirectory) {
        yield* flushAndYield(tree, block);
      } else {
        for await (const unwrapped of tree.eachChildSeries()) {
          if (!unwrapped) {
            continue;
          }
          yield* flushAndYield(unwrapped.child, block);
        }
      }
    }
    module2.exports = treeBuilder;
  }
});

// ../../node_modules/ipfs-unixfs-importer/src/index.js
var require_src11 = __commonJS({
  "../../node_modules/ipfs-unixfs-importer/src/index.js"(exports2, module2) {
    "use strict";
    var parallelBatch = require_it_parallel_batch();
    var defaultOptions = require_options();
    async function* importer(source, block, options = {}) {
      const opts = defaultOptions(options);
      let dagBuilder;
      if (typeof options.dagBuilder === "function") {
        dagBuilder = options.dagBuilder;
      } else {
        dagBuilder = require_dag_builder();
      }
      let treeBuilder;
      if (typeof options.treeBuilder === "function") {
        treeBuilder = options.treeBuilder;
      } else {
        treeBuilder = require_tree_builder();
      }
      let candidates;
      if (Symbol.asyncIterator in source || Symbol.iterator in source) {
        candidates = source;
      } else {
        candidates = [source];
      }
      for await (const entry of treeBuilder(parallelBatch(dagBuilder(candidates, block, opts), opts.fileImportConcurrency), block, opts)) {
        yield {
          cid: entry.cid,
          path: entry.path,
          unixfs: entry.unixfs,
          size: entry.size
        };
      }
    }
    module2.exports = {
      importer
    };
  }
});

// ../../node_modules/ipfs-only-hash/index.js
var require_ipfs_only_hash = __commonJS({
  "../../node_modules/ipfs-only-hash/index.js"(exports2) {
    var { importer } = require_src11();
    var block = {
      get: async (cid) => {
        throw new Error(`unexpected block API get for ${cid}`);
      },
      put: async () => {
        throw new Error("unexpected block API put");
      }
    };
    exports2.of = async (content, options) => {
      options = options || {};
      options.onlyHash = true;
      if (typeof content === "string") {
        content = new TextEncoder().encode(content);
      }
      let lastCid;
      for await (const { cid } of importer([{ content }], block, options)) {
        lastCid = cid;
      }
      return `${lastCid}`;
    };
  }
});

// ../../packages/code/package.json
var version = "0.1.31";

// ../../packages/code/js/importmap.json
var imports = {
  "@babel/runtime/helpers/asyncIterator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/asyncIterator.js",
  "@babel/runtime/helpers/esm/asyncIterator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/asyncIterator.js",
  "@babel/runtime/helpers/jsx": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/jsx.js",
  "@babel/runtime/helpers/esm/jsx": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/jsx.js",
  "@babel/runtime/helpers/objectSpread2": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectSpread2.js",
  "@babel/runtime/helpers/esm/objectSpread2": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectSpread2.js",
  "@babel/runtime/helpers/typeof": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/typeof.js",
  "@babel/runtime/helpers/esm/typeof": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/typeof.js",
  "@babel/runtime/helpers/wrapRegExp": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/wrapRegExp.js",
  "@babel/runtime/helpers/esm/wrapRegExp": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/wrapRegExp.js",
  "@babel/runtime/helpers/AwaitValue": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/AwaitValue.js",
  "@babel/runtime/helpers/esm/AwaitValue": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/AwaitValue.js",
  "@babel/runtime/helpers/AsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/AsyncGenerator.js",
  "@babel/runtime/helpers/esm/AsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/AsyncGenerator.js",
  "@babel/runtime/helpers/wrapAsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/wrapAsyncGenerator.js",
  "@babel/runtime/helpers/esm/wrapAsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/wrapAsyncGenerator.js",
  "@babel/runtime/helpers/awaitAsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/awaitAsyncGenerator.js",
  "@babel/runtime/helpers/esm/awaitAsyncGenerator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/awaitAsyncGenerator.js",
  "@babel/runtime/helpers/asyncGeneratorDelegate": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/asyncGeneratorDelegate.js",
  "@babel/runtime/helpers/esm/asyncGeneratorDelegate": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/asyncGeneratorDelegate.js",
  "@babel/runtime/helpers/asyncToGenerator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/asyncToGenerator.js",
  "@babel/runtime/helpers/esm/asyncToGenerator": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/asyncToGenerator.js",
  "@babel/runtime/helpers/classCallCheck": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classCallCheck.js",
  "@babel/runtime/helpers/esm/classCallCheck": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classCallCheck.js",
  "@babel/runtime/helpers/createClass": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/createClass.js",
  "@babel/runtime/helpers/esm/createClass": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/createClass.js",
  "@babel/runtime/helpers/defineEnumerableProperties": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/defineEnumerableProperties.js",
  "@babel/runtime/helpers/esm/defineEnumerableProperties": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/defineEnumerableProperties.js",
  "@babel/runtime/helpers/defaults": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/defaults.js",
  "@babel/runtime/helpers/esm/defaults": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/defaults.js",
  "@babel/runtime/helpers/defineProperty": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/defineProperty.js",
  "@babel/runtime/helpers/esm/defineProperty": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/defineProperty.js",
  "@babel/runtime/helpers/extends": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/extends.js",
  "@babel/runtime/helpers/esm/extends": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/extends.js",
  "@babel/runtime/helpers/objectSpread": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectSpread.js",
  "@babel/runtime/helpers/esm/objectSpread": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectSpread.js",
  "@babel/runtime/helpers/inherits": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/inherits.js",
  "@babel/runtime/helpers/esm/inherits": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/inherits.js",
  "@babel/runtime/helpers/inheritsLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/inheritsLoose.js",
  "@babel/runtime/helpers/esm/inheritsLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/inheritsLoose.js",
  "@babel/runtime/helpers/getPrototypeOf": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/getPrototypeOf.js",
  "@babel/runtime/helpers/esm/getPrototypeOf": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/getPrototypeOf.js",
  "@babel/runtime/helpers/setPrototypeOf": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/setPrototypeOf.js",
  "@babel/runtime/helpers/esm/setPrototypeOf": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/setPrototypeOf.js",
  "@babel/runtime/helpers/isNativeReflectConstruct": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/isNativeReflectConstruct.js",
  "@babel/runtime/helpers/esm/isNativeReflectConstruct": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/isNativeReflectConstruct.js",
  "@babel/runtime/helpers/construct": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/construct.js",
  "@babel/runtime/helpers/esm/construct": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/construct.js",
  "@babel/runtime/helpers/isNativeFunction": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/isNativeFunction.js",
  "@babel/runtime/helpers/esm/isNativeFunction": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/isNativeFunction.js",
  "@babel/runtime/helpers/wrapNativeSuper": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/wrapNativeSuper.js",
  "@babel/runtime/helpers/esm/wrapNativeSuper": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/wrapNativeSuper.js",
  "@babel/runtime/helpers/instanceof": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/instanceof.js",
  "@babel/runtime/helpers/esm/instanceof": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/instanceof.js",
  "@babel/runtime/helpers/interopRequireDefault": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/interopRequireDefault.js",
  "@babel/runtime/helpers/esm/interopRequireDefault": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/interopRequireDefault.js",
  "@babel/runtime/helpers/interopRequireWildcard": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/interopRequireWildcard.js",
  "@babel/runtime/helpers/esm/interopRequireWildcard": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/interopRequireWildcard.js",
  "@babel/runtime/helpers/newArrowCheck": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/newArrowCheck.js",
  "@babel/runtime/helpers/esm/newArrowCheck": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/newArrowCheck.js",
  "@babel/runtime/helpers/objectDestructuringEmpty": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectDestructuringEmpty.js",
  "@babel/runtime/helpers/esm/objectDestructuringEmpty": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectDestructuringEmpty.js",
  "@babel/runtime/helpers/objectWithoutPropertiesLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectWithoutPropertiesLoose.js",
  "@babel/runtime/helpers/esm/objectWithoutPropertiesLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectWithoutPropertiesLoose.js",
  "@babel/runtime/helpers/objectWithoutProperties": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectWithoutProperties.js",
  "@babel/runtime/helpers/esm/objectWithoutProperties": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/objectWithoutProperties.js",
  "@babel/runtime/helpers/assertThisInitialized": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/assertThisInitialized.js",
  "@babel/runtime/helpers/esm/assertThisInitialized": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/assertThisInitialized.js",
  "@babel/runtime/helpers/possibleConstructorReturn": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/possibleConstructorReturn.js",
  "@babel/runtime/helpers/esm/possibleConstructorReturn": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/possibleConstructorReturn.js",
  "@babel/runtime/helpers/createSuper": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/createSuper.js",
  "@babel/runtime/helpers/esm/createSuper": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/createSuper.js",
  "@babel/runtime/helpers/superPropBase": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/superPropBase.js",
  "@babel/runtime/helpers/esm/superPropBase": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/superPropBase.js",
  "@babel/runtime/helpers/get": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/get.js",
  "@babel/runtime/helpers/esm/get": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/get.js",
  "@babel/runtime/helpers/set": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/set.js",
  "@babel/runtime/helpers/esm/set": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/set.js",
  "@babel/runtime/helpers/taggedTemplateLiteral": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/taggedTemplateLiteral.js",
  "@babel/runtime/helpers/esm/taggedTemplateLiteral": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/taggedTemplateLiteral.js",
  "@babel/runtime/helpers/taggedTemplateLiteralLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/taggedTemplateLiteralLoose.js",
  "@babel/runtime/helpers/esm/taggedTemplateLiteralLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/taggedTemplateLiteralLoose.js",
  "@babel/runtime/helpers/readOnlyError": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/readOnlyError.js",
  "@babel/runtime/helpers/esm/readOnlyError": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/readOnlyError.js",
  "@babel/runtime/helpers/writeOnlyError": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/writeOnlyError.js",
  "@babel/runtime/helpers/esm/writeOnlyError": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/writeOnlyError.js",
  "@babel/runtime/helpers/classNameTDZError": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classNameTDZError.js",
  "@babel/runtime/helpers/esm/classNameTDZError": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classNameTDZError.js",
  "@babel/runtime/helpers/temporalUndefined": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/temporalUndefined.js",
  "@babel/runtime/helpers/esm/temporalUndefined": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/temporalUndefined.js",
  "@babel/runtime/helpers/tdz": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/tdz.js",
  "@babel/runtime/helpers/esm/tdz": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/tdz.js",
  "@babel/runtime/helpers/temporalRef": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/temporalRef.js",
  "@babel/runtime/helpers/esm/temporalRef": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/temporalRef.js",
  "@babel/runtime/helpers/slicedToArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/slicedToArray.js",
  "@babel/runtime/helpers/esm/slicedToArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/slicedToArray.js",
  "@babel/runtime/helpers/slicedToArrayLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/slicedToArrayLoose.js",
  "@babel/runtime/helpers/esm/slicedToArrayLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/slicedToArrayLoose.js",
  "@babel/runtime/helpers/toArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/toArray.js",
  "@babel/runtime/helpers/esm/toArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/toArray.js",
  "@babel/runtime/helpers/toConsumableArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/toConsumableArray.js",
  "@babel/runtime/helpers/esm/toConsumableArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/toConsumableArray.js",
  "@babel/runtime/helpers/arrayWithoutHoles": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/arrayWithoutHoles.js",
  "@babel/runtime/helpers/esm/arrayWithoutHoles": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/arrayWithoutHoles.js",
  "@babel/runtime/helpers/arrayWithHoles": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/arrayWithHoles.js",
  "@babel/runtime/helpers/esm/arrayWithHoles": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/arrayWithHoles.js",
  "@babel/runtime/helpers/maybeArrayLike": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/maybeArrayLike.js",
  "@babel/runtime/helpers/esm/maybeArrayLike": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/maybeArrayLike.js",
  "@babel/runtime/helpers/iterableToArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/iterableToArray.js",
  "@babel/runtime/helpers/esm/iterableToArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/iterableToArray.js",
  "@babel/runtime/helpers/iterableToArrayLimit": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/iterableToArrayLimit.js",
  "@babel/runtime/helpers/esm/iterableToArrayLimit": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/iterableToArrayLimit.js",
  "@babel/runtime/helpers/iterableToArrayLimitLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/iterableToArrayLimitLoose.js",
  "@babel/runtime/helpers/esm/iterableToArrayLimitLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/iterableToArrayLimitLoose.js",
  "@babel/runtime/helpers/unsupportedIterableToArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/unsupportedIterableToArray.js",
  "@babel/runtime/helpers/esm/unsupportedIterableToArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/unsupportedIterableToArray.js",
  "@babel/runtime/helpers/arrayLikeToArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/arrayLikeToArray.js",
  "@babel/runtime/helpers/esm/arrayLikeToArray": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/arrayLikeToArray.js",
  "@babel/runtime/helpers/nonIterableSpread": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/nonIterableSpread.js",
  "@babel/runtime/helpers/esm/nonIterableSpread": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/nonIterableSpread.js",
  "@babel/runtime/helpers/nonIterableRest": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/nonIterableRest.js",
  "@babel/runtime/helpers/esm/nonIterableRest": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/nonIterableRest.js",
  "@babel/runtime/helpers/createForOfIteratorHelper": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/createForOfIteratorHelper.js",
  "@babel/runtime/helpers/esm/createForOfIteratorHelper": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/createForOfIteratorHelper.js",
  "@babel/runtime/helpers/createForOfIteratorHelperLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/createForOfIteratorHelperLoose.js",
  "@babel/runtime/helpers/esm/createForOfIteratorHelperLoose": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/createForOfIteratorHelperLoose.js",
  "@babel/runtime/helpers/skipFirstGeneratorNext": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/skipFirstGeneratorNext.js",
  "@babel/runtime/helpers/esm/skipFirstGeneratorNext": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/skipFirstGeneratorNext.js",
  "@babel/runtime/helpers/toPrimitive": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/toPrimitive.js",
  "@babel/runtime/helpers/esm/toPrimitive": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/toPrimitive.js",
  "@babel/runtime/helpers/toPropertyKey": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/toPropertyKey.js",
  "@babel/runtime/helpers/esm/toPropertyKey": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/toPropertyKey.js",
  "@babel/runtime/helpers/initializerWarningHelper": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/initializerWarningHelper.js",
  "@babel/runtime/helpers/esm/initializerWarningHelper": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/initializerWarningHelper.js",
  "@babel/runtime/helpers/initializerDefineProperty": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/initializerDefineProperty.js",
  "@babel/runtime/helpers/esm/initializerDefineProperty": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/initializerDefineProperty.js",
  "@babel/runtime/helpers/applyDecoratedDescriptor": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/applyDecoratedDescriptor.js",
  "@babel/runtime/helpers/esm/applyDecoratedDescriptor": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/applyDecoratedDescriptor.js",
  "@babel/runtime/helpers/classPrivateFieldLooseKey": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldLooseKey.js",
  "@babel/runtime/helpers/esm/classPrivateFieldLooseKey": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldLooseKey.js",
  "@babel/runtime/helpers/classPrivateFieldLooseBase": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldLooseBase.js",
  "@babel/runtime/helpers/esm/classPrivateFieldLooseBase": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldLooseBase.js",
  "@babel/runtime/helpers/classPrivateFieldGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldGet.js",
  "@babel/runtime/helpers/esm/classPrivateFieldGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldGet.js",
  "@babel/runtime/helpers/classPrivateFieldSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldSet.js",
  "@babel/runtime/helpers/esm/classPrivateFieldSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldSet.js",
  "@babel/runtime/helpers/classPrivateFieldDestructureSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldDestructureSet.js",
  "@babel/runtime/helpers/esm/classPrivateFieldDestructureSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldDestructureSet.js",
  "@babel/runtime/helpers/classExtractFieldDescriptor": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classExtractFieldDescriptor.js",
  "@babel/runtime/helpers/esm/classExtractFieldDescriptor": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classExtractFieldDescriptor.js",
  "@babel/runtime/helpers/classStaticPrivateFieldSpecGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateFieldSpecGet.js",
  "@babel/runtime/helpers/esm/classStaticPrivateFieldSpecGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateFieldSpecGet.js",
  "@babel/runtime/helpers/classStaticPrivateFieldSpecSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateFieldSpecSet.js",
  "@babel/runtime/helpers/esm/classStaticPrivateFieldSpecSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateFieldSpecSet.js",
  "@babel/runtime/helpers/classStaticPrivateMethodGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateMethodGet.js",
  "@babel/runtime/helpers/esm/classStaticPrivateMethodGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateMethodGet.js",
  "@babel/runtime/helpers/classStaticPrivateMethodSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateMethodSet.js",
  "@babel/runtime/helpers/esm/classStaticPrivateMethodSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateMethodSet.js",
  "@babel/runtime/helpers/classApplyDescriptorGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classApplyDescriptorGet.js",
  "@babel/runtime/helpers/esm/classApplyDescriptorGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classApplyDescriptorGet.js",
  "@babel/runtime/helpers/classApplyDescriptorSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classApplyDescriptorSet.js",
  "@babel/runtime/helpers/esm/classApplyDescriptorSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classApplyDescriptorSet.js",
  "@babel/runtime/helpers/classApplyDescriptorDestructureSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classApplyDescriptorDestructureSet.js",
  "@babel/runtime/helpers/esm/classApplyDescriptorDestructureSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classApplyDescriptorDestructureSet.js",
  "@babel/runtime/helpers/classStaticPrivateFieldDestructureSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateFieldDestructureSet.js",
  "@babel/runtime/helpers/esm/classStaticPrivateFieldDestructureSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classStaticPrivateFieldDestructureSet.js",
  "@babel/runtime/helpers/classCheckPrivateStaticAccess": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classCheckPrivateStaticAccess.js",
  "@babel/runtime/helpers/esm/classCheckPrivateStaticAccess": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classCheckPrivateStaticAccess.js",
  "@babel/runtime/helpers/classCheckPrivateStaticFieldDescriptor": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classCheckPrivateStaticFieldDescriptor.js",
  "@babel/runtime/helpers/esm/classCheckPrivateStaticFieldDescriptor": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classCheckPrivateStaticFieldDescriptor.js",
  "@babel/runtime/helpers/decorate": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/decorate.js",
  "@babel/runtime/helpers/esm/decorate": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/decorate.js",
  "@babel/runtime/helpers/classPrivateMethodGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateMethodGet.js",
  "@babel/runtime/helpers/esm/classPrivateMethodGet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateMethodGet.js",
  "@babel/runtime/helpers/checkPrivateRedeclaration": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/checkPrivateRedeclaration.js",
  "@babel/runtime/helpers/esm/checkPrivateRedeclaration": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/checkPrivateRedeclaration.js",
  "@babel/runtime/helpers/classPrivateFieldInitSpec": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldInitSpec.js",
  "@babel/runtime/helpers/esm/classPrivateFieldInitSpec": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateFieldInitSpec.js",
  "@babel/runtime/helpers/classPrivateMethodInitSpec": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateMethodInitSpec.js",
  "@babel/runtime/helpers/esm/classPrivateMethodInitSpec": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateMethodInitSpec.js",
  "@babel/runtime/helpers/classPrivateMethodSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateMethodSet.js",
  "@babel/runtime/helpers/esm/classPrivateMethodSet": "https://unpkg.com/@babel/runtime@7.16.3/helpers/esm/classPrivateMethodSet.js",
  "@emotion/cache": "https://unpkg.com/@emotion/cache@11.6.0/dist/emotion-cache.browser.esm.js",
  "@emotion/hash": "https://unpkg.com/@emotion/hash@0.8.0/dist/hash.browser.esm.js",
  "@emotion/is-prop-valid": "https://unpkg.com/@emotion/is-prop-valid@1.1.1/dist/emotion-is-prop-valid.browser.esm.js",
  "@emotion/memoize": "https://unpkg.com/@emotion/memoize@0.7.5/dist/emotion-memoize.browser.esm.js",
  "@emotion/react": "https://unpkg.com/@emotion/react@11.6.0/dist/emotion-react.browser.esm.js",
  "@emotion/serialize": "https://unpkg.com/@emotion/serialize@1.0.2/dist/emotion-serialize.browser.esm.js",
  "@emotion/sheet": "https://unpkg.com/@emotion/sheet@1.1.0/dist/emotion-sheet.browser.esm.js",
  "@emotion/styled": "https://unpkg.com/@emotion/styled@11.6.0/dist/emotion-styled.browser.esm.js",
  "@emotion/utils": "https://unpkg.com/@emotion/utils@1.0.0/dist/emotion-utils.browser.esm.js",
  "@emotion/unitless": "https://unpkg.com/@emotion/unitless@0.7.5/dist/unitless.browser.esm.js",
  "@emotion/weak-memoize": "https://unpkg.com/@emotion/weak-memoize@0.2.5/dist/weak-memoize.browser.esm.js",
  "prop-types": "https://esm.sh/prop-types",
  "diff-match-patch": "https://unpkg.com/@spike.land/esm@0.1.23/dist/diff-match-patch.mjs",
  "framer-motion": "https://unpkg.com/@spike.land/esm@0.1.23/dist/framer-motion.mjs",
  framesync: "https://unpkg.com/framesync@6.0.1/dist/es/index.mjs",
  "hey-listen": "https://unpkg.com/hey-listen@1.0.8/dist/hey-listen.es.js",
  "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
  popmotion: "https://unpkg.com/popmotion@11.0.0/dist/es/index.mjs",
  react: "https://unpkg.com/@spike.land/esm@0.1.23/dist/react.mjs",
  "react-dom": "https://unpkg.com/@spike.land/esm@0.1.23/dist/react-dom.mjs",
  "react-is": "https://unpkg.com/@spike.land/esm@0.1.23/dist/react-is.mjs",
  "react-transition-group": "https://esm.sh/react-transition-group",
  "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
  "@spike.land/renderer": "https://unpkg.com/@spike.land/renderer@0.1.23/dist/renderer.js",
  "style-value-types": "https://unpkg.com/style-value-types@5.0.0/dist/es/index.mjs",
  stylis: "https://unpkg.com/stylis@4.0.10/dist/stylis.mjs",
  "@spike.land/qrious": "https://unpkg.com/@spike.land/qrious@0.1.11/dist/QRious.mjs",
  tslib: "https://unpkg.com/tslib@2.3.1/tslib.es6.js",
  "ipfs-only-hash": "https://unpkg.com/@spike.land/esm@0.1.23/dist/ipfs-only-hash.mjs",
  "@zedvision/swm": "https://unpkg.com/@zedvision/swm@4.0.0/public/swm-esm.js",
  "uuid/": "https://unpkg.com/uuid@8.3.2/dist/esm-browser/",
  "@spike.land/code": "https://unpkg.com/@spike.land/code@0.1.31/js/reactLoader.mjs",
  comlink: "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs",
  "@spike.land/ipfs": "https://unpkg.com/@spike.land/ipfs@0.1.11/dist/ipfs.client.mjs",
  "workbox-window": "https://unpkg.com/workbox-window@6.4.1/build/workbox-window.prod.es5.mjs"
};
var importmap_default = {
  imports
};

// src/index.html
var src_default = `<!DOCTYPE html>
<html lang="en">
<head profile="http://www.w3.org/2005/10/profile">
  <meta http-equiv="Content-Type" content="text/html,charset=utf-8" />
  <meta name="viewport" content="width=device-width">
  <link rel="preload" href="https://unpkg.com/monaco-editor@0.30.1/min/vs/editor/editor.main.js" as="script" />
  <link rel="icon" type="image/png" href="@VERSION/assets/zed-icon-big.png" />
  <link rel="stylesheet" href="@VERSION/assets/app.css" />

  
  <script crossorigin src="https://unpkg.com/react@17.0.2/umd/react.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-is@17.0.2/umd/react-is.production.min.js"><\/script>
  <script crossorigin src="https://unpkg.com/react-dom@17.0.2/umd/react-dom.production.min.js"><\/script>
  <title>Instant React Editor</title>
  <style>
    body{
      background-image: url(./assets/synthwave.webp);
    }
			body {
				margin: 0;
				padding: 0;
				border: 0;
			}
    
     @font-face {
      font-family: 'codicon';
      src: url('https://unpkg.com/monaco-editor@0.30.1/min/vs/base/browser/ui/codicons/codicon/codicon.ttf')
        format('truetype');
    }
		
  </style>
		<link
			data-name="vs/editor/editor.main"
			rel="stylesheet"
			href="https://unpkg.com/monaco-editor@0.30.1/min/vs/editor/editor.main.css"
		/>
</head>
<body>
  <script async src="https://unpkg.com/es-module-shims@1.3.2/dist/es-module-shims.js"><\/script>
  <script type="importmap">
    $$IMPORTMAP
  <\/script>
  <script type="module">
    import app from "app";
    app()
  <\/script>
  <script type="text/javascript">
    /**************/
  <\/script>
</body>
</html>
`;

// ../../packages/cf-npm-site/dist/index.mjs
function src_default2(packageName, version3, serveDir = "") {
  return async function(request, env) {
    try {
      const url = new URL(request.url);
      const { pathname } = url;
      const uri = pathname.startsWith("/@") ? pathname.substring(1) : `@${version3}${serveDir ? `/${serveDir}` : ``}${pathname}`;
      let myCache = await caches.open(`blog-npm:${version3}-${serveDir}`);
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
      const resp = fetch(`https://unpkg.com/${packageName}${targetPath}`);
      myCache.put(request, (await resp).clone());
      return resp;
    } catch (Error2) {
      return new Response(`Yayy... ${Object.prototype.toString.call(Error2)}`);
    }
  };
}

// src/handleErrors.mjs
async function handleErrors(request, func) {
  try {
    return await func();
  } catch (err) {
    if (request.headers.get("Upgrade") == "websocket") {
      let pair = new WebSocketPair();
      pair[1].accept();
      pair[1].send(JSON.stringify({ error: err.stack }));
      pair[1].close(1011, "Uncaught exception during session setup");
      return new Response(null, { status: 101, webSocket: pair[0] });
    } else {
      return new Response(err.stack, { status: 500 });
    }
  }
}

// src/chat.mjs
var chat_default = {
  async fetch(request, env) {
    return await handleErrors(request, async () => {
      let url = new URL(request.url);
      let path = url.pathname.slice(1).split("/");
      if (!path[0]) {
        const html1 = src_default.slice(0, src_default.length - 40) + "*/";
        const html2 = "/*" + src_default.slice(src_default.length - 40);
        const rand = Math.random();
        const injection = `
              console.log(${rand});
          `;
        const regex = /VERSION/ig;
        importmap_default.imports.app = `./@${version}/js/starter.mjs`;
        return new Response(html1.replace("$$IMPORTMAP", JSON.stringify(importmap_default)).replaceAll(regex, version) + injection + html2, {
          headers: {
            "Content-Type": "text/html;charset=UTF-8",
            "Cache-Control": "no-cache"
          }
        });
      }
      switch (path[0]) {
        case "api":
          return handleApiRequest(path.slice(1), request, env);
        default:
          return src_default2("@spike.land/code", version)(request, env);
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
      let name3 = path[1];
      let id;
      if (name3.match(/^[0-9a-f]{64}$/)) {
        id = env.CODE.idFromString(name3);
      } else if (name3.length <= 32) {
        id = env.CODE.idFromName(name3);
      } else {
        return new Response("Name too long", { status: 404 });
      }
      let roomObject = env.CODE.get(id);
      let newUrl = new URL(request.url);
      newUrl.pathname = "/" + path.slice(2).join("/");
      return roomObject.fetch(newUrl, request);
    }
    default:
      return new Response("Not found", { status: 404 });
  }
}

// src/rateLimiterClient.mjs
var RateLimiterClient = class {
  constructor(getLimiterStub, reportError) {
    this.getLimiterStub = getLimiterStub;
    this.reportError = reportError;
    this.limiter = getLimiterStub();
    this.inCooldown = false;
  }
  checkLimit() {
    if (this.inCooldown) {
      return false;
    }
    this.inCooldown = true;
    this.callLimiter();
    return true;
  }
  async callLimiter() {
    try {
      let response;
      try {
        response = await this.limiter.fetch("https://dummy-url", {
          method: "POST"
        });
      } catch (err) {
        this.limiter = this.getLimiterStub();
        response = await this.limiter.fetch("https://dummy-url", {
          method: "POST"
        });
      }
      let cooldown = +await response.text();
      await new Promise((resolve) => setTimeout(resolve, cooldown * 100));
      this.inCooldown = false;
    } catch (err) {
      this.reportError(err);
    }
  }
};

// src/chatRoom.mjs
var import_diff_match_patch = __toModule(require_diff_match_patch());
var import_ipfs_only_hash = __toModule(require_ipfs_only_hash());
var Code = class {
  constructor(controller, env) {
    this.storage = controller.storage;
    this.env = env;
    this.sessions = [];
    this.lastTimestamp = 0;
  }
  async fetch(request) {
    return await handleErrors(request, async () => {
      let url = new URL(request.url);
      let path = url.pathname.slice(1).split("/");
      switch (path[0]) {
        case "code": {
          const code3 = await this.storage.get("code");
          return new Response(`code is: ${code3}`, {
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
          let ip = request.headers.get("CF-Connecting-IP");
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
    webSocket.accept();
    let limiterId = this.env.LIMITERS.idFromName(ip);
    let limiter = new RateLimiterClient(() => this.env.LIMITERS.get(limiterId), (err) => webSocket.close(1011, err.stack));
    let session = { webSocket, blockedMessages: [] };
    this.sessions.push(session);
    this.sessions.forEach((otherSession) => {
      if (otherSession.name) {
        session.blockedMessages.push(JSON.stringify({ joined: otherSession.name }));
      }
    });
    let hashOfCode;
    let code3 = await this.storage.get("code") || await this.storage.get("lastSeenCode");
    if (code3) {
      hashOfCode = await import_ipfs_only_hash.default.of(code3);
      session.blockedMessages.push(JSON.stringify({ hashOfCode, code: code3 }));
    }
    let receivedUserInfo = false;
    webSocket.addEventListener("message", async (msg) => {
      try {
        if (session.quit) {
          webSocket.close(1011, "WebSocket broken.");
          return;
        }
        if (!limiter.checkLimit()) {
          webSocket.send(JSON.stringify({
            error: "Your IP is being rate-limited, please try again later."
          }));
          return;
        }
        let data = JSON.parse(msg.data);
        if (!receivedUserInfo) {
          session.name = "" + (data.name || "anonymous");
          if (session.name.length > 32) {
            webSocket.send(JSON.stringify({ error: "Name too long." }));
            webSocket.close(1009, "Name too long.");
            return;
          }
          session.blockedMessages.forEach((queued) => {
            webSocket.send(queued);
          });
          delete session.blockedMessages;
          this.broadcast({ joined: session.name });
          webSocket.send(JSON.stringify({ ready: true }));
          receivedUserInfo = true;
          return;
        }
        const difference = data.difference;
        let code4 = data.code;
        const hashOfCode2 = data.hashOfCode;
        const hashOfPreviousCode = data.hashOfStarterCode;
        const previousCode = hashOfPreviousCode && (await this.storage.get(hashOfPreviousCode) || await this.storage.get("code") || await this.storage.get("lastSeenCode"));
        data = { name: session.name, message: data.message };
        if (difference) {
          const dmp = new import_diff_match_patch.default();
          const patches = dmp.patch_fromText(difference);
          const patchedCode = dmp.patch_apply(patches, previousCode)[0];
          const hashOfAPatched = await import_ipfs_only_hash.default.of(patchedCode);
          if (hashOfCode2 === hashOfAPatched) {
            data.hashOfCode = hashOfAPatched;
            data.hashOfPreviousCode = hashOfPreviousCode;
            data.difference = difference;
            code4 = patchedCode;
          } else {
            data.hashToNeed = hashOfAPatched;
          }
        }
        if (data.code && data.hashOfCode) {
          const hashOfCode3 = await import_ipfs_only_hash.default.of(data.code);
          if (data.hashOfCode === hashOfCode3) {
            code4 = data.code;
          }
        }
        data.timestamp = Math.max(Date.now(), this.lastTimestamp + 1);
        this.lastTimestamp = data.timestamp;
        let dataStr = JSON.stringify(data);
        this.broadcast(dataStr);
        let key = new Date(data.timestamp).toISOString();
        if (code4 && previousCode !== code4) {
          const hashOfCode3 = await import_ipfs_only_hash.default.of(code4);
          await this.storage.put(hashOfCode3, code4);
          await this.storage.put("code", code4);
        }
        await this.storage.put("code", code4);
        await this.storage.put(key, dataStr);
      } catch (err) {
        webSocket.send(JSON.stringify({ error: err.stack }));
      }
    });
    let closeOrErrorHandler = (evt) => {
      session.quit = true;
      this.sessions = this.sessions.filter((member) => member !== session);
      if (session.name) {
        this.broadcast({ quit: session.name });
      }
    };
    webSocket.addEventListener("close", closeOrErrorHandler);
    webSocket.addEventListener("error", closeOrErrorHandler);
  }
  broadcast(message) {
    if (typeof message !== "string") {
      message = JSON.stringify(message);
    }
    let quitters = [];
    this.sessions = this.sessions.filter((session) => {
      if (session.name) {
        try {
          session.webSocket.send(message);
          return true;
        } catch (err) {
          session.quit = true;
          quitters.push(session);
          return false;
        }
      } else {
        session.blockedMessages.push(message);
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

// src/rateLimiter.mjs
var CodeRateLimiter = class {
  constructor(controller, env) {
    this.nextAllowedTime = 0;
  }
  async fetch(request) {
    return await handleErrors(request, async () => {
      let now = Date.now() / 1e3;
      this.nextAllowedTime = Math.max(now, this.nextAllowedTime);
      if (request.method == "POST") {
        this.nextAllowedTime += 1;
      }
      let cooldown = Math.max(0, this.nextAllowedTime - now - 20);
      return new Response(cooldown);
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
/*!
 * The buffer module from node.js, for the browser.
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
/*! ieee754. BSD-3-Clause License. Feross Aboukhadijeh <https://feross.org/opensource> */
/**
 * [js-sha3]{@link https://github.com/emn178/js-sha3}
 *
 * @version 0.8.0
 * @author Chen, Yi-Cyuan [emn178@gmail.com]
 * @copyright Chen, Yi-Cyuan 2015-2018
 * @license MIT
 */
//! stable.js 0.1.8, https://github.com/Two-Screen/stable
//! © 2018 Angry Bytes and contributors. MIT licensed.
