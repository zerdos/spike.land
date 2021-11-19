var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __markAsModule = (target) => __defProp(target, "__esModule", { value: true });
var __commonJS = (cb, mod) => function __require() {
  return mod || (0, cb[Object.keys(cb)[0]])((mod = { exports: {} }).exports, mod), mod.exports;
};
var __reExport = (target, module, desc) => {
  if (module && typeof module === "object" || typeof module === "function") {
    for (let key of __getOwnPropNames(module))
      if (!__hasOwnProp.call(target, key) && key !== "default")
        __defProp(target, key, { get: () => module[key], enumerable: !(desc = __getOwnPropDesc(module, key)) || desc.enumerable });
  }
  return target;
};
var __toModule = (module) => {
  return __reExport(__markAsModule(__defProp(module != null ? __create(__getProtoOf(module)) : {}, "default", module && module.__esModule && "default" in module ? { get: () => module.default, enumerable: true } : { value: module, enumerable: true })), module);
};

// ../../node_modules/diff-match-patch/index.js
var require_diff_match_patch = __commonJS({
  "../../node_modules/diff-match-patch/index.js"(exports, module) {
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
      var length = 1;
      while (true) {
        var pattern = text1.substring(text_length - length);
        var found = text2.indexOf(pattern);
        if (found == -1) {
          return best;
        }
        length += found;
        if (found == 0 || text1.substring(text_length - length) == text2.substring(0, length)) {
          best = length;
          length++;
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
                var mod = patches[x].diffs[y];
                if (mod[0] !== DIFF_EQUAL) {
                  index2 = this.diff_xIndex(diffs, index1);
                }
                if (mod[0] === DIFF_INSERT) {
                  text = text.substring(0, start_loc + index2) + mod[1] + text.substring(start_loc + index2);
                } else if (mod[0] === DIFF_DELETE) {
                  text = text.substring(0, start_loc + index2) + text.substring(start_loc + this.diff_xIndex(diffs, index1 + mod[1].length));
                }
                if (mod[0] !== DIFF_DELETE) {
                  index1 += mod[1].length;
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
          var empty = true;
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
              empty = false;
            } else if (diff_type === DIFF_DELETE && patch.diffs.length == 1 && patch.diffs[0][0] == DIFF_EQUAL && diff_text.length > 2 * patch_size) {
              patch.length1 += diff_text.length;
              start1 += diff_text.length;
              empty = false;
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
                empty = false;
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
          if (!empty) {
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
    module.exports = diff_match_patch;
    module.exports["diff_match_patch"] = diff_match_patch;
    module.exports["DIFF_DELETE"] = DIFF_DELETE;
    module.exports["DIFF_INSERT"] = DIFF_INSERT;
    module.exports["DIFF_EQUAL"] = DIFF_EQUAL;
  }
});

// ../../packages/code/package.json
var version = "0.1.5";

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
  "framer-motion": "https://unpkg.com/@spike.land/esm@0.1.0/dist/framer-motion.mjs",
  framesync: "https://unpkg.com/framesync@6.0.1/dist/es/index.mjs",
  "hey-listen": "https://unpkg.com/hey-listen@1.0.8/dist/hey-listen.es.js",
  "hoist-non-react-statics": "https://esm.sh/hoist-non-react-statics",
  popmotion: "https://unpkg.com/popmotion@11.0.0/dist/es/index.mjs",
  react: "https://unpkg.com/@spike.land/esm@0.1.0/dist/react.mjs",
  "react-dom": "https://unpkg.com/@spike.land/esm@0.1.0/dist/react-dom.mjs",
  "react-is": "https://unpkg.com/@spike.land/esm@0.1.0/dist/react-is.mjs",
  "react-transition-group": "https://esm.sh/react-transition-group",
  "react/jsx-runtime": "https://esm.sh/react/jsx-runtime",
  "@spike.land/renderer": "https://unpkg.com/@spike.land/renderer@0.1.4/dist/renderer.js",
  "style-value-types": "https://unpkg.com/style-value-types@5.0.0/dist/es/index.mjs",
  stylis: "https://unpkg.com/stylis@4.0.10/dist/stylis.mjs",
  "@spike.land/qrious": "https://unpkg.com/@spike.land/qrious@0.1.0/dist/QRious.mjs",
  tslib: "https://unpkg.com/tslib@2.3.1/tslib.es6.js",
  "ipfs-only-hash": "https://unpkg.com/@spike.land/esm@0.1.0/dist/ipfs-only-hash.mjs",
  "@zedvision/swm": "https://unpkg.com/@zedvision/swm@4.0.0/public/swm-esm.js",
  "uuid/": "https://unpkg.com/uuid@8.3.2/dist/esm-browser/",
  "@spike.land/code": "https://unpkg.com/@spike.land/code@0.1.5/js/reactLoader.mjs",
  comlink: "https://unpkg.com/comlink@4.3.1/dist/esm/comlink.mjs",
  "@spike.land/ipfs": "https://unpkg.com/@spike.land/ipfs@0.1.0/dist/ipfs.client.mjs",
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
  <script src="https://cdnjs.cloudflare.com/ajax/libs/diff_match_patch/20121119/diff_match_patch_uncompressed.js" integrity="sha512-nvDKZefgrUzFIvEHMqag0VFPe6QYOVKGP9e40yCfbY+nOeSzSxzoFSUj1D6Mpc5r5UZzQISujUWDNhwReIyRzA==" crossorigin="anonymous" referrerpolicy="no-referrer"><\/script>
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
   (async () => {
  let currentWebSocket = null;

  const chCode = (code) => {
    try {
      const { monaco } = window;
      if (!monaco || !monaco.Uri) return;
      const modelUri = monaco.Uri.parse(\`file:///main.tsx\`);
      const model = monaco.editor.getModel(modelUri);
      const oldCode = model.getValue();

      if (oldCode !== code) {
        console.log({ oldCode });

        model.setValue(code);
      }
    } catch (e) {
      console.error({ e });
    }
  };

  let hostname = window.location.host;
  if (hostname == "") {
    // Probably testing the HTML locally.
    hostname = "code.spike.land";
  }

  let roomName = "ROOMNAMEagain";
  let username = "Pisti" + Math.random();
  let lastSeenTimestamp = 0;
  let lastSeenCode = "";

  function join() {
    let ws = new WebSocket(
      "wss://" + hostname + "/api/room/" + roomName + "/websocket",
    );
    let rejoined = false;
    let startTime = Date.now();

    let rejoin = async () => {
      if (!rejoined) {
        rejoined = true;
        currentWebSocket = null;

        // Clear the roster.
        //  while (roster.firstChild) {
        //   roster.removeChild(roster.firstChild);
        //    }

        // Don't try to reconnect too rapidly.
        let timeSinceLastJoin = Date.now() - startTime;
        if (timeSinceLastJoin < 10000) {
          // Less than 10 seconds elapsed since last join. Pause a bit.
          await new Promise((resolve) =>
            setTimeout(resolve, 10000 - timeSinceLastJoin)
          );
        }

        // OK, reconnect now!
        join();
      }
    };

    ws.addEventListener("open", (event) => {
      console.log("connected");
      currentWebSocket = ws;
      window.chCode = chCode;
      window.broad = async (code) => {
        if (code !== lastSeenCode) {
          let difference;
          try {
            const dmp = new diff_match_patch();

            const patches = dmp.patch_make(lastSeenCode, code);
            difference = dmp.patch_toText(patches);
            console.log(difference);
          } catch (e) {
            console.error({ e });
          }

          currentWebSocket.send(JSON.stringify({ difference, code }));
        }
      };

      // Send user info message.
      ws.send(JSON.stringify({ name: username }));
    });

    ws.addEventListener("message", (event) => {
      let data = JSON.parse(event.data);
      if (data.code) {
          lastSeenCode = data.code;
          window.starterCode = lastSeenCode;
        }

      // A regular chat message.
      if (data.timestamp > lastSeenTimestamp) {
        if (data.code) {
          lastSeenCode = data.code;
          window.starterCode = lastSeenCode;
        } else if (
          (data.message === "undefined" || !data.message) &&
          data.message !== lastSeenCode && data.name !== username
        ) {
          if (
            (data.message === "undefined" || !data.message) &&
            data.difference && lastSeenCode 
          ) {
            const dmp = new diff_match_patch();
            const patches = dmp.patch_fromText(data.difference);
            const patched = dmp.patch_apply(patches, lastSeenCode);

            if (patched[0]) lastSeenCode = patched[0];
            console.log(patched[1]);

            // const newLastSeen = window.assemble(lastSeenCode, JSON.stringify(data.difference.c));
            // console.log("AASSEMBLED", newLastSeen);
          } else if (data.message && data.message!=="undefined") {
            lastSeenCode = data.message;
          }
        }

        if (lastSeenCode && lastSeenCode !== window.starterCode) {
          window.starterCode = lastSeenCode;
          if (data.username !== username) chCode(lastSeenCode);
        }
      }
      // addChatMessage(data.name, data.message);
      lastSeenTimestamp = data.timestamp;
    });

    ws.addEventListener("close", (event) => {
      console.log("WebSocket closed, reconnecting:", event.code, event.reason);
      rejoin();
    });
    ws.addEventListener("error", (event) => {
      console.log("WebSocket error, reconnecting:", event);
      rejoin();
    });
  }

  console.log("hello hello2");
  join();
})();
    /**************/
  <\/script>
</body>
</html>
`;

// ../../packages/cf-npm-site/dist/index.mjs
function src_default2(packageName, version2, serveDir = "") {
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
        if (request.method == "POST") {
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
      await new Promise((resolve) => setTimeout(resolve, cooldown * 1e3));
      this.inCooldown = false;
    } catch (err) {
      this.reportError(err);
    }
  }
};

// src/chatRoom.mjs
var import_diff_match_patch = __toModule(require_diff_match_patch());
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
      switch (url.pathname) {
        case "/websocket": {
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
    let lastSeenCode = await this.storage.get("lastSeenCode");
    session.blockedMessages.push(JSON.stringify({ code: lastSeenCode }));
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
        const lastSeenCode2 = await this.storage.get("lastSeenCode");
        let code = data.code;
        data = { name: session.name, message: data.message };
        if (difference) {
          data.difference = difference;
          const dmp = new import_diff_match_patch.default();
          const patches = dmp.patch_fromText(difference);
          code = dmp.patch_apply(patches, lastSeenCode2)[0];
          await this.storage.put("lastSeenCode", code);
        }
        data.timestamp = Math.max(Date.now(), this.lastTimestamp + 1);
        this.lastTimestamp = data.timestamp;
        let dataStr = JSON.stringify(data);
        this.broadcast(dataStr);
        let key = new Date(data.timestamp).toISOString();
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
