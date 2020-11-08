const DIFF_DELETE = -1 as DiffType;
const DIFF_INSERT = 1 as DiffType;
const DIFF_EQUAL = 0 as DiffType;

type DiffType = -1 | 0 | 1;

type Diff = [
  diffType: DiffType,
  diffStr: string,
];

type Range = { index: number; length: number };
type CursorRange = { oldRange: Range; newRange: Range };

function diffMain(
  { text1, text2, cursorPos }: {
    text1: string;
    text2: string;
    cursorPos: number;
  },
): Diff[] {
  // Check for equality
  if (text1 === text2) {
    if (text1) {
      return [[DIFF_EQUAL, text1]];
    }
    return [];
  }

  if (cursorPos) {
    const editdiff = findCursorEditDiff(text1, text2, cursorPos);
    if (editdiff) {
      return editdiff;
    }
  }

  // Trim off common prefix (speedup).
  let commonlength = diffCommonPrefix(text1, text2);
  const commonprefix = text1.substring(0, commonlength);
  text1 = text1.substring(commonlength);
  text2 = text2.substring(commonlength);

  // Trim off common suffix (speedup).
  commonlength = diffCommonSuffix(text1, text2);
  const commonsuffix = text1.substring(text1.length - commonlength);
  text1 = text1.substring(0, text1.length - commonlength);
  text2 = text2.substring(0, text2.length - commonlength);

  // Compute the diff on the middle block.
  const diffs = diffCompute_(text1, text2);

  // Restore the prefix and suffix.
  if (commonprefix) {
    diffs.unshift([DIFF_EQUAL, commonprefix]);
  }
  if (commonsuffix) {
    diffs.push([DIFF_EQUAL, commonsuffix]);
  }
  diffCleanupMerge(diffs);
  return diffs;
}

function diffCompute_(text1: string, text2: string): Diff[] {
  let diffs: Diff[];

  if (!text1) {
    // Just add some text (speedup).
    return [[DIFF_INSERT, text2]];
  }

  if (!text2) {
    // Just delete some text (speedup).
    return [[DIFF_DELETE, text1]];
  }

  const longtext = text1.length > text2.length ? text1 : text2;
  const shorttext = text1.length > text2.length ? text2 : text1;
  const i = longtext.indexOf(shorttext);
  if (i !== -1) {
    // Shorter text is inside the longer text (speedup).
    diffs = [
      [DIFF_INSERT, longtext.substring(0, i)],
      [DIFF_EQUAL, shorttext],
      [DIFF_INSERT, longtext.substring(i + shorttext.length)],
    ];
    // Swap insertions for deletions if diff is reversed.
    if (text1.length > text2.length) {
      diffs[0][0] = diffs[2][0] = DIFF_DELETE;
    }
    return diffs;
  }

  if (shorttext.length === 1) {
    // Single character string.
    // After the previous speedup, the character can't be an equality.
    return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]];
  }

  // Check to see if the problem can be split in two.
  const hm = diffHalfMatch_(text1, text2);
  if (hm) {
    // A half-match was found, sort out the return data.
    const text1C = hm[0] || "";
    const text1B = hm[1] || "";
    const text2C = hm[2] || "";
    const text2B = hm[3] || "";
    const midCommon = hm[4] || "";
    // Send both pairs off for separate processing.
    const diffsA = diffMain(
      { text1: text1C, text2: text2C, cursorPos: 0 },
    );
    const diffsB = diffMain(
      { text1: text1B, text2: text2B, cursorPos: 0 },
    );
    // Merge the results.
    return diffsA.concat([[DIFF_EQUAL, midCommon[1]]], diffsB);
  }

  return diffBisect_(text1, text2);
}

function diffBisect_(text1: string, text2: string) {
  // Cache the text lengths to prevent multiple calls.
  const text1Length = text1.length;
  const text2Length = text2.length;
  const maxD = Math.ceil((text1Length + text2Length) / 2);
  const vOffset = maxD;
  const vLength = 2 * maxD;
  const v1 = new Array(vLength);
  const v2 = new Array(vLength);
  // Setting all elements to -1 is faster in Chrome & Firefox than mixing
  // integers and undefined.
  for (let x = 0; x < vLength; x++) {
    v1[x] = -1;
    v2[x] = -1;
  }
  v1[vOffset + 1] = 0;
  v2[vOffset + 1] = 0;
  const delta = text1Length - text2Length;
  // If the total number of characters is odd, then the front path will collide
  // with the reverse path.
  const front = (delta % 2 !== 0);
  // Offsets for start and end of k loop.
  // Prevents mapping of space beyond the grid.
  let k1start = 0;
  let k1end = 0;
  let k2start = 0;
  let k2end = 0;
  for (let d = 0; d < maxD; d++) {
    // Walk the front path one step.
    for (let k1 = -d + k1start; k1 <= d - k1end; k1 += 2) {
      const k1Offset = vOffset + k1;
      let x1;
      if (k1 === -d || (k1 !== d && v1[k1Offset - 1] < v1[k1Offset + 1])) {
        x1 = v1[k1Offset + 1];
      } else {
        x1 = v1[k1Offset - 1] + 1;
      }
      let y1 = x1 - k1;
      while (
        x1 < text1Length && y1 < text2Length &&
        text1.charAt(x1) === text2.charAt(y1)
      ) {
        x1++;
        y1++;
      }
      v1[k1Offset] = x1;
      if (x1 > text1Length) {
        // Ran off the right of the graph.
        k1end += 2;
      } else if (y1 > text2Length) {
        // Ran off the bottom of the graph.
        k1start += 2;
      } else if (front) {
        const k2Offset = vOffset + delta - k1;
        if (k2Offset >= 0 && k2Offset < vLength && v2[k2Offset] !== -1) {
          // Mirror x2 onto top-left coordinate system.
          const x2 = text1Length - v2[k2Offset];
          if (x1 >= x2) {
            // Overlap detected.
            return diffBisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }

    let x2;
    // Walk the reverse path one step.
    for (let k2 = -d + k2start; k2 <= d - k2end; k2 += 2) {
      const k2Offset = vOffset + k2;
      if (k2 === -d || (k2 !== d && v2[k2Offset - 1] < v2[k2Offset + 1])) {
        x2 = v2[k2Offset + 1];
      } else {
        x2 = v2[k2Offset - 1] + 1;
      }
      let y2 = x2 - k2;
      while (
        x2 < text1Length && y2 < text2Length &&
        text1.charAt(text1Length - x2 - 1) ===
          text2.charAt(text2Length - y2 - 1)
      ) {
        x2++;
        y2++;
      }
      v2[k2Offset] = x2;
      if (x2 > text1Length) {
        // Ran off the left of the graph.
        k2end += 2;
      } else if (y2 > text2Length) {
        // Ran off the top of the graph.
        k2start += 2;
      } else if (!front) {
        const k1Offset = vOffset + delta - k2;
        if (k1Offset >= 0 && k1Offset < vLength && v1[k1Offset] !== -1) {
          const x1 = v1[k1Offset];
          const y1 = vOffset + x1 - k1Offset;
          // Mirror x2 onto top-left coordinate system.
          x2 = text1Length - x2;
          if (x1 >= x2) {
            // Overlap detected.
            return diffBisectSplit_(text1, text2, x1, y1);
          }
        }
      }
    }
  }
  // Diff took too long and hit the deadline or
  // number of diffs equals number of characters, no commonality at all.
  return [[DIFF_DELETE, text1], [DIFF_INSERT, text2]] as Diff[];
}

function diffBisectSplit_(text1: string, text2: string, x: number, y: number) {
  const text1a = text1.substring(0, x);
  const text2a = text2.substring(0, y);
  const text1b = text1.substring(x);
  const text2b = text2.substring(y);

  // Compute both diffs serially.
  const diffs = diffMain(
    { text1: text1a, text2: text2a, cursorPos: 0 },
  );
  const diffsB = diffMain(
    { text1: text1b, text2: text2b, cursorPos: 0 },
  );

  return diffs.concat(diffsB);
}

function diffCommonPrefix(text1: string, text2: string) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  let pointerMin = 0;
  let pointerMax = Math.min(text1.length, text2.length);
  let pointerMid = pointerMax;
  let pointerStart = 0;
  while (pointerMin < pointerMid) {
    if (
      text1.substring(pointerStart, pointerMid) ==
        text2.substring(pointerStart, pointerMid)
    ) {
      pointerMin = pointerMid;
      pointerStart = pointerMin;
    } else {
      pointerMax = pointerMid;
    }
    pointerMid = Math.floor((pointerMax - pointerMin) / 2 + pointerMin);
  }

  if (isSurrogatePairStart(text1.charCodeAt(pointerMid - 1))) {
    pointerMid--;
  }

  return pointerMid;
}

function diffCommonSuffix(text1: string, text2: string) {
  // Quick check for common null cases.
  if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
    return 0;
  }
  // Binary search.
  // Performance analysis: http://neil.fraser.name/news/2007/10/09/
  let pointerMin = 0;
  let pointerMax = Math.min(text1.length, text2.length);
  let pointerMid = pointerMax;
  let pointerEnd = 0;
  while (pointerMin < pointerMid) {
    if (
      text1.substring(text1.length - pointerMid, text1.length - pointerEnd) ==
        text2.substring(text2.length - pointerMid, text2.length - pointerEnd)
    ) {
      pointerMin = pointerMid;
      pointerEnd = pointerMin;
    } else {
      pointerMax = pointerMid;
    }
    pointerMid = Math.floor((pointerMax - pointerMin) / 2 + pointerMin);
  }

  if (isSurrogatePairEnd(text1.charCodeAt(text1.length - pointerMid))) {
    pointerMid--;
  }

  return pointerMid;
}

function diffHalfMatch_(text1: string, text2: string) {
  const longtext = text1.length > text2.length ? text1 : text2;
  const shorttext = text1.length > text2.length ? text2 : text1;
  if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
    return null; // Pointless.
  }

  function diffHalfMatchI_(longtext: string, shorttext: string, i: number) {
    // Start with a 1/4 length substring at position i as a seed.
    const seed = longtext.substring(i, i + Math.floor(longtext.length / 4));
    let j = -1;
    let bestCommon = "";
    let bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB;
    while ((j = shorttext.indexOf(seed, j + 1)) !== -1) {
      const prefixLength = diffCommonPrefix(
        longtext.substring(i),
        shorttext.substring(j),
      );
      const suffixLength = diffCommonSuffix(
        longtext.substring(0, i),
        shorttext.substring(0, j),
      );
      if (bestCommon.length < suffixLength + prefixLength) {
        bestCommon = shorttext.substring(
          j - suffixLength,
          j,
        ) + shorttext.substring(j, j + prefixLength);
        bestLongtextA = longtext.substring(0, i - suffixLength);
        bestLongtextB = longtext.substring(i + prefixLength);
        bestShorttextA = shorttext.substring(0, j - suffixLength);
        bestShorttextB = shorttext.substring(j + prefixLength);
      }
    }
    if (bestCommon.length * 2 >= longtext.length) {
      return [
        bestLongtextA,
        bestLongtextB,
        bestShorttextA,
        bestShorttextB,
        bestCommon,
      ] as string[];
    } else {
      return null;
    }
  }

  // First check if the second quarter is the seed for a half-match.
  const hm1 = diffHalfMatchI_(
    longtext,
    shorttext,
    Math.ceil(longtext.length / 4),
  );
  // Check again based on the third quarter.
  const hm2 = diffHalfMatchI_(
    longtext,
    shorttext,
    Math.ceil(longtext.length / 2),
  );
  let hm: string[];

  if (hm2 === null && hm1 === null) return null;
  else if (hm2 === null) {
    if (hm1 === null) {
      return null;
    }
    hm = hm1;
  } else if (hm1 === null) {
    if (hm2 === null) {
      return null;
    }
    hm = hm2;
  } else {
    hm = hm1![4].length > hm2![4].length ? hm1 : hm2;
  }

  // A half-match was found, sort out the return data.
  let text1A, text1B, text2A, text2B;
  if (text1.length > text2.length) {
    text1A = hm[0];
    text1B = hm[1];
    text2A = hm[2];
    text2B = hm[3];
  } else {
    text2A = hm[0];
    text2B = hm[1];
    text1A = hm[2];
    text1B = hm[3];
  }
  const midCommon = hm[4];
  return [text1A, text1B, text2A, text2B, midCommon];
}

export function diffCleanupMerge(Diffs: Diff[]): Diff[] {
  const diffs = [...Diffs];

  diffs.push([DIFF_EQUAL, ""]); // Add a dummy entry at the end.
  let pointer = 0;
  let countDelete = 0;
  let countInsert = 0;
  let textDelete = "";
  let textInsert = "";
  let commonlength;
  let previousEquality;
  while (pointer < diffs.length) {
    if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
      diffs.splice(pointer, 1);
      continue;
    }
    switch (diffs[pointer][0]) {
      case DIFF_INSERT:
        countInsert++;
        textInsert += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_DELETE:
        countDelete++;
        textDelete += diffs[pointer][1];
        pointer++;
        break;
      case DIFF_EQUAL:
        previousEquality = pointer - countInsert - countDelete - 1;

        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
          // for empty equality not at end, wait for next equality
          diffs.splice(pointer, 1);
          break;
        }
        if (textDelete.length > 0 || textInsert.length > 0) {
          // note that diffCommonPrefix and diffCommonSuffix are unicode-aware
          if (textDelete.length > 0 && textInsert.length > 0) {
            // Factor out any common prefixes.
            commonlength = diffCommonPrefix(textInsert, textDelete);
            if (commonlength !== 0) {
              if (previousEquality >= 0) {
                diffs[previousEquality][1] += textInsert.substring(
                  0,
                  commonlength,
                );
              } else {
                diffs.splice(
                  0,
                  0,
                  [DIFF_EQUAL, textInsert.substring(0, commonlength)],
                );
                pointer++;
              }
              textInsert = textInsert.substring(commonlength);
              textDelete = textDelete.substring(commonlength);
            }
            // Factor out any common suffixes.
            commonlength = diffCommonSuffix(textInsert, textDelete);
            if (commonlength !== 0) {
              diffs[pointer][1] =
                textInsert.substring(textInsert.length - commonlength) +
                diffs[pointer][1];
              textInsert = textInsert.substring(
                0,
                textInsert.length - commonlength,
              );
              textDelete = textDelete.substring(
                0,
                textDelete.length - commonlength,
              );
            }
          }
          // Delete the offending records and add the merged ones.
          const n = countInsert + countDelete;
          if (textDelete.length === 0 && textInsert.length === 0) {
            diffs.splice(pointer - n, n);
            pointer = pointer - n;
          } else if (textDelete.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_INSERT, textInsert]);
            pointer = pointer - n + 1;
          } else if (textInsert.length === 0) {
            diffs.splice(pointer - n, n, [DIFF_DELETE, textDelete]);
            pointer = pointer - n + 1;
          } else {
            diffs.splice(
              pointer - n,
              n,
              [DIFF_DELETE, textDelete],
              [DIFF_INSERT, textInsert],
            );
            pointer = pointer - n + 2;
          }
        }
        if (pointer !== 0 && diffs[pointer - 1][0] === DIFF_EQUAL) {
          // Merge this equality with the previous one.
          diffs[pointer - 1][1] += diffs[pointer][1];
          diffs.splice(pointer, 1);
        } else {
          pointer++;
        }
        countInsert = 0;
        countDelete = 0;
        textDelete = "";
        textInsert = "";
        break;
    }
  }
  if (diffs[diffs.length - 1][1] === "") {
    diffs.pop(); // Remove the dummy entry at the end.
  }

  // Second pass: look for single edits surrounded on both sides by equalities
  // which can be shifted sideways to eliminate an equality.
  // e.g: A<ins>BA</ins>C -> <ins>AB</ins>AC
  let changes = false;
  pointer = 1;
  // Intentionally ignore the first and last element (don't need checking).
  while (pointer < diffs.length - 1) {
    if (
      diffs[pointer - 1][0] === DIFF_EQUAL &&
      diffs[pointer + 1][0] === DIFF_EQUAL
    ) {
      // This is a single edit surrounded by equalities.
      if (
        diffs[pointer][1].substring(
          diffs[pointer][1].length -
            diffs[pointer - 1][1].length,
        ) === diffs[pointer - 1][1]
      ) {
        // Shift the edit over the previous equality.
        diffs[pointer][1] = diffs[pointer - 1][1] +
          diffs[pointer][1].substring(
            0,
            diffs[pointer][1].length -
              diffs[pointer - 1][1].length,
          );
        diffs[pointer + 1][1] = diffs[pointer - 1][1] + diffs[pointer + 1][1];
        diffs.splice(pointer - 1, 1);
        changes = true;
      } else if (
        diffs[pointer][1].substring(0, diffs[pointer + 1][1].length) ==
          diffs[pointer + 1][1]
      ) {
        // Shift the edit over the next equality.
        diffs[pointer - 1][1] += diffs[pointer + 1][1];
        diffs[pointer][1] =
          diffs[pointer][1].substring(diffs[pointer + 1][1].length) +
          diffs[pointer + 1][1];
        diffs.splice(pointer + 1, 1);
        changes = true;
      }
    }
    pointer++;
    isSurrogatePairStart;
  }
  // If shifts were made, the diff needs reordering and another shift sweep.
  if (changes) {
    ``;
    return diffCleanupMerge(diffs);
  }
  return diffs;
}

function isSurrogatePairStart(charCode: number) {
  return charCode >= 0xD800 && charCode <= 0xDBFF;
}

function isSurrogatePairEnd(charCode: number) {
  return charCode >= 0xDC00 && charCode <= 0xDFFF;
}

function startsWithPairEnd(str: string) {
  return isSurrogatePairEnd(str.charCodeAt(0));
}

function endsWithPairStart(str: string) {
  return isSurrogatePairStart(str.charCodeAt(str.length - 1));
}

function removeEmptyTuples(tuples: Diff[]) {
  const ret = [];
  for (let i = 0; i < tuples.length; i++) {
    if (tuples[i][1].length > 0) {
      ret.push(tuples[i]);
    }
  }
  return ret;
}

function makeEditSplice(
  before: string,
  oldMiddle: string,
  newMiddle: string,
  after: string,
) {
  if (endsWithPairStart(before) || startsWithPairEnd(after)) {
    return null;
  }
  return removeEmptyTuples([
    [DIFF_EQUAL, before],
    [DIFF_DELETE, oldMiddle],
    [DIFF_INSERT, newMiddle],
    [DIFF_EQUAL, after],
  ]);
}

function findCursorEditDiff(
  oldText: string,
  newText: string,
  cursorPos: number | CursorRange,
) {
  // note: this runs after equality check has ruled out exact equality
  const oldRange = typeof cursorPos === "number"
    ? { index: cursorPos, length: 0 }
    : cursorPos.oldRange;
  const newRange = typeof cursorPos === "number" ? null : cursorPos.newRange;
  // take into account the old and new selection to generate the best diff
  // possible for a text edit.  for example, a text change from "xxx" to "xx"
  // could be a delete or forwards-delete of any one of the x's, or the
  // result of selecting two of the x's and typing "x".
  const oldLength = oldText.length;
  const newLength = newText.length;
  if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
    // see if we have an insert or delete before or after cursor
    const oldCursor = oldRange.index;
    const oldBefore = oldText.slice(0, oldCursor);
    const oldAfter = oldText.slice(oldCursor);
    const maybeNewCursor = newRange ? newRange.index : null;
    editBefore: {
      // is this an insert or delete right before oldCursor?
      const newCursor = oldCursor + newLength - oldLength;
      if (maybeNewCursor !== null && maybeNewCursor !== newCursor) {
        break editBefore;
      }
      if (newCursor < 0 || newCursor > newLength) {
        break editBefore;
      }
      const newBefore = newText.slice(0, newCursor);
      const newAfter = newText.slice(newCursor);
      if (newAfter !== oldAfter) {
        break editBefore;
      }
      const prefixLength = Math.min(oldCursor, newCursor);
      const oldPrefix = oldBefore.slice(0, prefixLength);
      const newPrefix = newBefore.slice(0, prefixLength);
      if (oldPrefix !== newPrefix) {
        break editBefore;
      }
      const oldMiddle = oldBefore.slice(prefixLength);
      const newMiddle = newBefore.slice(prefixLength);
      return makeEditSplice(oldPrefix, oldMiddle, newMiddle, oldAfter);
    }
    editAfter: {
      // is this an insert or delete right after oldCursor?
      if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
        break editAfter;
      }
      const cursor = oldCursor;
      const newBefore = newText.slice(0, cursor);
      const newAfter = newText.slice(cursor);
      if (newBefore !== oldBefore) {
        break editAfter;
      }
      const suffixLength = Math.min(oldLength - cursor, newLength - cursor);
      const oldSuffix = oldAfter.slice(oldAfter.length - suffixLength);
      const newSuffix = newAfter.slice(newAfter.length - suffixLength);
      if (oldSuffix !== newSuffix) {
        break editAfter;
      }
      const oldMiddle = oldAfter.slice(0, oldAfter.length - suffixLength);
      const newMiddle = newAfter.slice(0, newAfter.length - suffixLength);
      return makeEditSplice(oldBefore, oldMiddle, newMiddle, oldSuffix);
    }
  }
  if (oldRange.length > 0 && newRange && newRange.length === 0) {
    replaceRange: {
      // see if diff could be a splice of the old selection range
      const oldPrefix = oldText.slice(0, oldRange.index);
      const oldSuffix = oldText.slice(oldRange.index + oldRange.length);
      const prefixLength = oldPrefix.length;
      const suffixLength = oldSuffix.length;
      if (newLength < prefixLength + suffixLength) {
        break replaceRange;
      }
      const newPrefix = newText.slice(0, prefixLength);
      const newSuffix = newText.slice(newLength - suffixLength);
      if (oldPrefix !== newPrefix || oldSuffix !== newSuffix) {
        break replaceRange;
      }
      const oldMiddle = oldText.slice(prefixLength, oldLength - suffixLength);
      const newMiddle = newText.slice(prefixLength, newLength - suffixLength);
      return makeEditSplice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
    }
  }

  return null;
}

export function diff(text1: string, text2: string, cursorPos: number): Diff[] {
  // only pass fix_unicode=true at the top level, not when diffMain is
  // recursively invoked
  return diffMain({ text1, text2, cursorPos });
}

diff.INSERT = DIFF_INSERT;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = DIFF_EQUAL;
