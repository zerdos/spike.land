const DIFF_DELETE = -1;
function diffMain({ text1 , text2 , cursorPos  }) {
    if (text1 === text2) {
        if (text1) {
            return [
                [
                    0,
                    text1
                ]
            ];
        }
        return [];
    }
    if (cursorPos) {
        const editdiff = findCursorEditDiff(text1, text2, cursorPos);
        if (editdiff) {
            return editdiff;
        }
    }
    let commonlength = diffCommonPrefix(text1, text2);
    const commonprefix = text1.substring(0, commonlength);
    text1 = text1.substring(commonlength);
    text2 = text2.substring(commonlength);
    commonlength = diffCommonSuffix(text1, text2);
    const commonsuffix = text1.substring(text1.length - commonlength);
    text1 = text1.substring(0, text1.length - commonlength);
    text2 = text2.substring(0, text2.length - commonlength);
    const diffs = diffCompute_(text1, text2);
    if (commonprefix) {
        diffs.unshift([
            0,
            commonprefix
        ]);
    }
    if (commonsuffix) {
        diffs.push([
            0,
            commonsuffix
        ]);
    }
    diffCleanupMerge(diffs);
    return diffs;
}
function diffCompute_(text1, text2) {
    let diffs;
    if (!text1) {
        return [
            [
                1,
                text2
            ]
        ];
    }
    if (!text2) {
        return [
            [
                DIFF_DELETE,
                text1
            ]
        ];
    }
    const longtext = text1.length > text2.length ? text1 : text2;
    const shorttext = text1.length > text2.length ? text2 : text1;
    const i = longtext.indexOf(shorttext);
    if (i !== -1) {
        diffs = [
            [
                1,
                longtext.substring(0, i)
            ],
            [
                0,
                shorttext
            ],
            [
                1,
                longtext.substring(i + shorttext.length)
            ], 
        ];
        if (text1.length > text2.length) {
            diffs[0][0] = diffs[2][0] = DIFF_DELETE;
        }
        return diffs;
    }
    if (shorttext.length === 1) {
        return [
            [
                DIFF_DELETE,
                text1
            ],
            [
                1,
                text2
            ]
        ];
    }
    const hm = diffHalfMatch_(text1, text2);
    if (hm) {
        const text1C = hm[0] || "";
        const text1B = hm[1] || "";
        const text2C = hm[2] || "";
        const text2B = hm[3] || "";
        const midCommon = hm[4] || "";
        const diffsA = diffMain({
            text1: text1C,
            text2: text2C,
            cursorPos: 0
        });
        const diffsB = diffMain({
            text1: text1B,
            text2: text2B,
            cursorPos: 0
        });
        return diffsA.concat([
            [
                0,
                midCommon[1]
            ]
        ], diffsB);
    }
    return diffBisect_(text1, text2);
}
function diffBisect_(text1, text2) {
    const text1Length = text1.length;
    const text2Length = text2.length;
    const maxD = Math.ceil((text1Length + text2Length) / 2);
    const vOffset = maxD;
    const vLength = 2 * maxD;
    const v1 = new Array(vLength);
    const v2 = new Array(vLength);
    for(let x = 0; x < vLength; x++){
        v1[x] = -1;
        v2[x] = -1;
    }
    v1[vOffset + 1] = 0;
    v2[vOffset + 1] = 0;
    const delta = text1Length - text2Length;
    const front = delta % 2 !== 0;
    let k1start = 0;
    let k1end = 0;
    let k2start = 0;
    let k2end = 0;
    for(let d = 0; d < maxD; d++){
        for(let k1 = -d + k1start; k1 <= d - k1end; k1 += 2){
            const k1Offset = maxD + k1;
            let x1;
            if (k1 === -d || k1 !== d && v1[k1Offset - 1] < v1[k1Offset + 1]) {
                x1 = v1[k1Offset + 1];
            } else {
                x1 = v1[k1Offset - 1] + 1;
            }
            let y1 = x1 - k1;
            while(x1 < text1Length && y1 < text2Length && text1.charAt(x1) === text2.charAt(y1)){
                x1++;
                y1++;
            }
            v1[k1Offset] = x1;
            if (x1 > text1Length) {
                k1end += 2;
            } else if (y1 > text2Length) {
                k1start += 2;
            } else if (front) {
                const k2Offset = maxD + delta - k1;
                if (k2Offset >= 0 && k2Offset < vLength && v2[k2Offset] !== -1) {
                    const x2 = text1Length - v2[k2Offset];
                    if (x1 >= x2) {
                        return diffBisectSplit_(text1, text2, x1, y1);
                    }
                }
            }
        }
        let x2;
        for(let k2 = -d + k2start; k2 <= d - k2end; k2 += 2){
            const k2Offset = maxD + k2;
            if (k2 === -d || k2 !== d && v2[k2Offset - 1] < v2[k2Offset + 1]) {
                x2 = v2[k2Offset + 1];
            } else {
                x2 = v2[k2Offset - 1] + 1;
            }
            let y2 = x2 - k2;
            while(x2 < text1Length && y2 < text2Length && text1.charAt(text1Length - x2 - 1) === text2.charAt(text2Length - y2 - 1)){
                x2++;
                y2++;
            }
            v2[k2Offset] = x2;
            if (x2 > text1Length) {
                k2end += 2;
            } else if (y2 > text2Length) {
                k2start += 2;
            } else if (!front) {
                const k1Offset = maxD + delta - k2;
                if (k1Offset >= 0 && k1Offset < vLength && v1[k1Offset] !== -1) {
                    const x1 = v1[k1Offset];
                    const y1 = maxD + x1 - k1Offset;
                    x2 = text1Length - x2;
                    if (x1 >= x2) {
                        return diffBisectSplit_(text1, text2, x1, y1);
                    }
                }
            }
        }
    }
    return [
        [
            DIFF_DELETE,
            text1
        ],
        [
            1,
            text2
        ]
    ];
}
function diffBisectSplit_(text1, text2, x, y) {
    const text1a = text1.substring(0, x);
    const text2a = text2.substring(0, y);
    const text1b = text1.substring(x);
    const text2b = text2.substring(y);
    const diffs = diffMain({
        text1: text1a,
        text2: text2a,
        cursorPos: 0
    });
    const diffsB = diffMain({
        text1: text1b,
        text2: text2b,
        cursorPos: 0
    });
    return diffs.concat(diffsB);
}
function diffCommonPrefix(text1, text2) {
    if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
        return 0;
    }
    let pointerMin = 0;
    let pointerMax = Math.min(text1.length, text2.length);
    let pointerMid = pointerMax;
    let pointerStart = 0;
    while(pointerMin < pointerMid){
        if (text1.substring(pointerStart, pointerMid) == text2.substring(pointerStart, pointerMid)) {
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
function diffCommonSuffix(text1, text2) {
    if (!text1 || !text2 || text1.slice(-1) !== text2.slice(-1)) {
        return 0;
    }
    let pointerMin = 0;
    let pointerMax = Math.min(text1.length, text2.length);
    let pointerMid = pointerMax;
    let pointerEnd = 0;
    while(pointerMin < pointerMid){
        if (text1.substring(text1.length - pointerMid, text1.length - pointerEnd) == text2.substring(text2.length - pointerMid, text2.length - pointerEnd)) {
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
function diffHalfMatch_(text1, text2) {
    const longtext = text1.length > text2.length ? text1 : text2;
    const shorttext = text1.length > text2.length ? text2 : text1;
    if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
        return null;
    }
    function diffHalfMatchI_(longtext1, shorttext1, i) {
        const seed = longtext1.substring(i, i + Math.floor(longtext1.length / 4));
        let j = -1;
        let bestCommon = "";
        let bestLongtextA, bestLongtextB, bestShorttextA, bestShorttextB;
        while((j = shorttext1.indexOf(seed, j + 1)) !== -1){
            const prefixLength = diffCommonPrefix(longtext1.substring(i), shorttext1.substring(j));
            const suffixLength = diffCommonSuffix(longtext1.substring(0, i), shorttext1.substring(0, j));
            if (bestCommon.length < suffixLength + prefixLength) {
                bestCommon = shorttext1.substring(j - suffixLength, j) + shorttext1.substring(j, j + prefixLength);
                bestLongtextA = longtext1.substring(0, i - suffixLength);
                bestLongtextB = longtext1.substring(i + prefixLength);
                bestShorttextA = shorttext1.substring(0, j - suffixLength);
                bestShorttextB = shorttext1.substring(j + prefixLength);
            }
        }
        if (bestCommon.length * 2 >= longtext1.length) {
            return [
                bestLongtextA,
                bestLongtextB,
                bestShorttextA,
                bestShorttextB,
                bestCommon, 
            ];
        } else {
            return null;
        }
    }
    const hm1 = diffHalfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
    const hm2 = diffHalfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
    let hm;
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
        hm = hm1[4].length > hm2[4].length ? hm1 : hm2;
    }
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
    return [
        text1A,
        text1B,
        text2A,
        text2B,
        midCommon
    ];
}
export function diffCleanupMerge(Diffs) {
    const diffs = [
        ...Diffs
    ];
    diffs.push([
        0,
        ""
    ]);
    let pointer = 0;
    let countDelete = 0;
    let countInsert = 0;
    let textDelete = "";
    let textInsert = "";
    let commonlength;
    let previousEquality;
    while(pointer < diffs.length){
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
            diffs.splice(pointer, 1);
            continue;
        }
        switch(diffs[pointer][0]){
            case 1:
                countInsert++;
                textInsert += diffs[pointer][1];
                pointer++;
                break;
            case DIFF_DELETE:
                countDelete++;
                textDelete += diffs[pointer][1];
                pointer++;
                break;
            case 0:
                previousEquality = pointer - countInsert - countDelete - 1;
                if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
                    diffs.splice(pointer, 1);
                    break;
                }
                if (textDelete.length > 0 || textInsert.length > 0) {
                    if (textDelete.length > 0 && textInsert.length > 0) {
                        commonlength = diffCommonPrefix(textInsert, textDelete);
                        if (commonlength !== 0) {
                            if (previousEquality >= 0) {
                                diffs[previousEquality][1] += textInsert.substring(0, commonlength);
                            } else {
                                diffs.splice(0, 0, [
                                    0,
                                    textInsert.substring(0, commonlength)
                                ]);
                                pointer++;
                            }
                            textInsert = textInsert.substring(commonlength);
                            textDelete = textDelete.substring(commonlength);
                        }
                        commonlength = diffCommonSuffix(textInsert, textDelete);
                        if (commonlength !== 0) {
                            diffs[pointer][1] = textInsert.substring(textInsert.length - commonlength) + diffs[pointer][1];
                            textInsert = textInsert.substring(0, textInsert.length - commonlength);
                            textDelete = textDelete.substring(0, textDelete.length - commonlength);
                        }
                    }
                    const n = countInsert + countDelete;
                    if (textDelete.length === 0 && textInsert.length === 0) {
                        diffs.splice(pointer - n, n);
                        pointer = pointer - n;
                    } else if (textDelete.length === 0) {
                        diffs.splice(pointer - n, n, [
                            1,
                            textInsert
                        ]);
                        pointer = pointer - n + 1;
                    } else if (textInsert.length === 0) {
                        diffs.splice(pointer - n, n, [
                            DIFF_DELETE,
                            textDelete
                        ]);
                        pointer = pointer - n + 1;
                    } else {
                        diffs.splice(pointer - n, n, [
                            DIFF_DELETE,
                            textDelete
                        ], [
                            1,
                            textInsert
                        ]);
                        pointer = pointer - n + 2;
                    }
                }
                if (pointer !== 0 && diffs[pointer - 1][0] === 0) {
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
        diffs.pop();
    }
    let changes = false;
    pointer = 1;
    while(pointer < diffs.length - 1){
        if (diffs[pointer - 1][0] === 0 && diffs[pointer + 1][0] === 0) {
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
        isSurrogatePairStart;
    }
    if (changes) {
        ``;
        return diffCleanupMerge(diffs);
    }
    return diffs;
}
function isSurrogatePairStart(charCode) {
    return charCode >= 55296 && charCode <= 56319;
}
function isSurrogatePairEnd(charCode) {
    return charCode >= 56320 && charCode <= 57343;
}
function startsWithPairEnd(str) {
    return isSurrogatePairEnd(str.charCodeAt(0));
}
function endsWithPairStart(str) {
    return isSurrogatePairStart(str.charCodeAt(str.length - 1));
}
function removeEmptyTuples(tuples) {
    const ret = [];
    for(let i = 0; i < tuples.length; i++){
        if (tuples[i][1].length > 0) {
            ret.push(tuples[i]);
        }
    }
    return ret;
}
function makeEditSplice(before, oldMiddle, newMiddle, after) {
    if (endsWithPairStart(before) || startsWithPairEnd(after)) {
        return null;
    }
    return removeEmptyTuples([
        [
            0,
            before
        ],
        [
            DIFF_DELETE,
            oldMiddle
        ],
        [
            1,
            newMiddle
        ],
        [
            0,
            after
        ], 
    ]);
}
function findCursorEditDiff(oldText, newText, cursorPos) {
    const oldRange = typeof cursorPos === "number" ? {
        index: cursorPos,
        length: 0
    } : cursorPos.oldRange;
    const newRange = typeof cursorPos === "number" ? null : cursorPos.newRange;
    const oldLength = oldText.length;
    const newLength = newText.length;
    if (oldRange.length === 0 && (newRange === null || newRange.length === 0)) {
        const oldCursor = oldRange.index;
        const oldBefore = oldText.slice(0, oldCursor);
        const oldAfter = oldText.slice(oldCursor);
        const maybeNewCursor = newRange ? newRange.index : null;
        editBefore: {
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
            if (maybeNewCursor !== null && maybeNewCursor !== oldCursor) {
                break editAfter;
            }
            const cursor = oldCursor;
            const newBefore = newText.slice(0, oldCursor);
            const newAfter = newText.slice(oldCursor);
            if (newBefore !== oldBefore) {
                break editAfter;
            }
            const suffixLength = Math.min(oldLength - oldCursor, newLength - oldCursor);
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
export function diff(text1, text2, cursorPos) {
    return diffMain({
        text1,
        text2,
        cursorPos
    });
}
diff.INSERT = 1;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = 0;
