const importScript = async (src)=>new Promise(function(resolve, reject) {
        const s = window.document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        window.document.head.appendChild(s);
    })
;
const makeDraggable = async ()=>{
    const onload = await importScript("https://unpkg.com/interactjs@1.10.0/dist/interact.js");
    const interact = window["interact"];
    interact(".draggable").draggable({
        inertia: true,
        modifiers: [
            interact.modifiers.restrictRect({
                restriction: "parent",
                endOnly: true
            }), 
        ],
        autoScroll: false,
        listeners: {
            move: dragMoveListener
        }
    });
};
function dragMoveListener(event) {
    const target = event.target;
    const x = (parseFloat(target.getAttribute("data-x")) || 0) + event.dx;
    const y = (parseFloat(target.getAttribute("data-y")) || 0) + event.dy;
    target.style.webkitTransform = target.style.transform = "translate(" + x + "px, " + y + "px)";
    target.setAttribute("data-x", x);
    target.setAttribute("data-y", y);
}
let monaco;
let editor;
const startMonaco = async ({ onChange , code , language  })=>{
    if (window["monaco"] === undefined) {
        await loadScript(`${"https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"}/loader.min.js`);
        const req = window.require;
        req.config({
            paths: {
                "vs": "https://cdnjs.cloudflare.com/ajax/libs/monaco-editor/0.21.2/min/vs"
            }
        });
        await (()=>new Promise((resolve)=>req([
                    "vs/editor/editor.main"
                ], resolve)
            )
        )();
        monaco = window.monaco;
    } else {
        editor.onDidChangeModelContent(()=>onChange(editor.getValue())
        );
        editor.setValue(code);
        return editor;
    }
    editor = monaco.editor.create(window.document.getElementById("container"), {
        cursorStyle: "block",
        formatOnType: true,
        scrollbar: {
            horizontal: "hidden",
            verticalHasArrows: true,
            verticalScrollbarSize: 20
        },
        minimap: {
            enabled: false
        },
        folding: false,
        multiCursorModifier: "alt",
        wordWrap: "on",
        wordWrapBreakAfterCharacters: ">([{]))],;}",
        mouseWheelZoom: false,
        wordWrapColumn: 70,
        automaticLayout: true,
        scrollBeyondLastLine: false,
        autoIndent: "brackets",
        autoClosingQuotes: "always",
        lineNumbers: "off",
        autoClosingBrackets: "always",
        autoClosingOvertype: "always",
        suggest: {
        },
        codeLens: true,
        autoSurround: "l  anguageDefined",
        trimAutoWhitespace: true,
        codeActionsOnSaveTimeout: 100,
        model: monaco.editor.createModel(code, language, monaco.Uri.parse(language === "typescript" ? "file:///main.tsx" : "file:///main.html")),
        value: code,
        language: language,
        theme: "vs-dark"
    });
    monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
        noSuggestionDiagnostics: true,
        noSemanticValidation: true,
        noSyntaxValidation: true
    });
    if (language === "typescript") {
        const importHelper = [
            {
                name: "react",
                url: "https://unpkg.com/@types/react@latest/index.d.ts",
                depend: [
                    "global",
                    "csstype",
                    "react-dom",
                    "prop-types"
                ]
            },
            {
                name: "global",
                url: "https://unpkg.com/@types/react@latest/global.d.ts",
                depend: []
            },
            {
                name: "prop-types",
                url: "https://unpkg.com/@types/prop-types@latest/index.d.ts",
                depend: []
            },
            {
                name: "react-dom",
                url: "https://unpkg.com/@types/react-dom@latest/index.d.ts",
                depend: []
            },
            {
                name: "csstype",
                url: "https://unpkg.com/csstype@latest/index.d.ts",
                depend: []
            }
        ];
        const dts = importHelper.map(({ name , url  })=>(async ()=>monaco.languages.typescript.typescriptDefaults.addExtraLib(await (await fetch(url)).text(), `file:///node_modules/@types/${name}/index.d.ts`)
            )()
        );
        monaco.languages.typescript.typescriptDefaults.setCompilerOptions({
            target: monaco.languages.typescript.ScriptTarget.ESNext,
            allowNonTsExtensions: true,
            allowUmdGlobalAccess: true,
            strict: true,
            allowJs: true,
            noEmitOnError: true,
            allowSyntheticDefaultImports: true,
            moduleResolution: monaco.languages.typescript.ModuleResolutionKind.NodeJs,
            module: monaco.languages.typescript.ModuleKind.CommonJS,
            noEmit: true,
            typeRoots: [
                "node_modules/@types"
            ],
            jsx: monaco.languages.typescript.JsxEmit.React,
            jsxFactory: "React.createElement",
            jsxFragmentFactory: "React.Fragment",
            esModuleInterop: true
        });
        await Promise.all(dts);
        monaco.languages.typescript.javascriptDefaults.setDiagnosticsOptions({
            noSuggestionDiagnostics: false,
            noSemanticValidation: false,
            noSyntaxValidation: false
        });
        return editor;
    }
};
function loadScript(src) {
    return new Promise(function(resolve, reject) {
        var s;
        s = window.document.createElement("script");
        s.src = src;
        s.onload = resolve;
        s.onerror = reject;
        window.document.head.appendChild(s);
    });
}
const DIFF_DELETE = -1;
const DIFF_EQUAL = 0;
function diff_main({ text1 , text2 , cursor_pos  }) {
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
    if (cursor_pos) {
        const editdiff = find_cursor_edit_diff(text1, text2, cursor_pos);
        if (editdiff) {
            return editdiff;
        }
    }
    let commonlength = diff_commonPrefix(text1, text2);
    const commonprefix = text1.substring(0, commonlength);
    text1 = text1.substring(commonlength);
    text2 = text2.substring(commonlength);
    commonlength = diff_commonSuffix(text1, text2);
    const commonsuffix = text1.substring(text1.length - commonlength);
    text1 = text1.substring(0, text1.length - commonlength);
    text2 = text2.substring(0, text2.length - commonlength);
    const diffs = diff_compute_(text1, text2);
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
    diff_cleanupMerge(diffs);
    return diffs;
}
function diff_compute_(text1, text2) {
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
    const hm = diff_halfMatch_(text1, text2);
    if (hm) {
        const text1_a = hm[0];
        const text1_b = hm[1];
        const text2_a = hm[2];
        const text2_b = hm[3];
        const mid_common = hm[4];
        const diffs_a = diff_main({
            text1: text1_a[1],
            text2: text2_a[1],
            cursor_pos: 0
        });
        const diffs_b = diff_main({
            text1: text1_b[1],
            text2: text2_b[1],
            cursor_pos: 0
        });
        return diffs_a.concat([
            [
                0,
                mid_common[1]
            ]
        ], diffs_b);
    }
    return diff_bisect_(text1, text2);
}
function diff_bisect_(text1, text2) {
    const text1_length = text1.length;
    const text2_length = text2.length;
    const max_d = Math.ceil((text1_length + text2_length) / 2);
    const v_offset = max_d;
    const v_length = 2 * max_d;
    const v1 = new Array(v_length);
    const v2 = new Array(v_length);
    for(let x = 0; x < v_length; x++){
        v1[x] = -1;
        v2[x] = -1;
    }
    v1[v_offset + 1] = 0;
    v2[v_offset + 1] = 0;
    const delta = text1_length - text2_length;
    const front = delta % 2 !== 0;
    let k1start = 0;
    let k1end = 0;
    let k2start = 0;
    let k2end = 0;
    for(let d = 0; d < max_d; d++){
        for(let k1 = -d + k1start; k1 <= d - k1end; k1 += 2){
            const k1_offset = max_d + k1;
            let x1;
            if (k1 === -d || k1 !== d && v1[k1_offset - 1] < v1[k1_offset + 1]) {
                x1 = v1[k1_offset + 1];
            } else {
                x1 = v1[k1_offset - 1] + 1;
            }
            let y1 = x1 - k1;
            while(x1 < text1_length && y1 < text2_length && text1.charAt(x1) === text2.charAt(y1)){
                x1++;
                y1++;
            }
            v1[k1_offset] = x1;
            if (x1 > text1_length) {
                k1end += 2;
            } else if (y1 > text2_length) {
                k1start += 2;
            } else if (front) {
                const k2_offset = max_d + delta - k1;
                if (k2_offset >= 0 && k2_offset < v_length && v2[k2_offset] !== -1) {
                    const x2 = text1_length - v2[k2_offset];
                    if (x1 >= x2) {
                        return diff_bisectSplit_(text1, text2, x1, y1);
                    }
                }
            }
        }
        let x2;
        for(let k2 = -d + k2start; k2 <= d - k2end; k2 += 2){
            const k2_offset = max_d + k2;
            if (k2 === -d || k2 !== d && v2[k2_offset - 1] < v2[k2_offset + 1]) {
                x2 = v2[k2_offset + 1];
            } else {
                x2 = v2[k2_offset - 1] + 1;
            }
            let y2 = x2 - k2;
            while(x2 < text1_length && y2 < text2_length && text1.charAt(text1_length - x2 - 1) === text2.charAt(text2_length - y2 - 1)){
                x2++;
                y2++;
            }
            v2[k2_offset] = x2;
            if (x2 > text1_length) {
                k2end += 2;
            } else if (y2 > text2_length) {
                k2start += 2;
            } else if (!front) {
                const k1_offset = max_d + delta - k2;
                if (k1_offset >= 0 && k1_offset < v_length && v1[k1_offset] !== -1) {
                    const x1 = v1[k1_offset];
                    const y1 = max_d + x1 - k1_offset;
                    x2 = text1_length - x2;
                    if (x1 >= x2) {
                        return diff_bisectSplit_(text1, text2, x1, y1);
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
function diff_bisectSplit_(text1, text2, x, y) {
    const text1a = text1.substring(0, x);
    const text2a = text2.substring(0, y);
    const text1b = text1.substring(x);
    const text2b = text2.substring(y);
    const diffs = diff_main({
        text1: text1a[1],
        text2: text2a[1],
        cursor_pos: 0
    });
    const diffsb = diff_main({
        text1: text1b[1],
        text2: text2b[1],
        cursor_pos: 0
    });
    return diffs.concat(diffsb);
}
function diff_commonPrefix(text1, text2) {
    if (!text1 || !text2 || text1.charAt(0) !== text2.charAt(0)) {
        return 0;
    }
    let pointermin = 0;
    let pointermax = Math.min(text1.length, text2.length);
    let pointermid = pointermax;
    let pointerstart = 0;
    while(pointermin < pointermid){
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
    let pointermin = 0;
    let pointermax = Math.min(text1.length, text2.length);
    let pointermid = pointermax;
    let pointerend = 0;
    while(pointermin < pointermid){
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
    const longtext = text1.length > text2.length ? text1 : text2;
    const shorttext = text1.length > text2.length ? text2 : text1;
    if (longtext.length < 4 || shorttext.length * 2 < longtext.length) {
        return null;
    }
    function diff_halfMatchI_(longtext1, shorttext1, i) {
        const seed = longtext1.substring(i, i + Math.floor(longtext1.length / 4));
        let j = -1;
        let best_common = "";
        let best_longtext_a, best_longtext_b, best_shorttext_a, best_shorttext_b;
        while((j = shorttext1.indexOf(seed, j + 1)) !== -1){
            const prefixLength = diff_commonPrefix(longtext1.substring(i), shorttext1.substring(j));
            const suffixLength = diff_commonSuffix(longtext1.substring(0, i), shorttext1.substring(0, j));
            if (best_common.length < suffixLength + prefixLength) {
                best_common = shorttext1.substring(j - suffixLength, j) + shorttext1.substring(j, j + prefixLength);
                best_longtext_a = longtext1.substring(0, i - suffixLength);
                best_longtext_b = longtext1.substring(i + prefixLength);
                best_shorttext_a = shorttext1.substring(0, j - suffixLength);
                best_shorttext_b = shorttext1.substring(j + prefixLength);
            }
        }
        if (best_common.length * 2 >= longtext1.length) {
            return [
                best_longtext_a,
                best_longtext_b,
                best_shorttext_a,
                best_shorttext_b,
                best_common, 
            ];
        } else {
            return null;
        }
    }
    const hm1 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 4));
    const hm2 = diff_halfMatchI_(longtext, shorttext, Math.ceil(longtext.length / 2));
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
    let text1_a, text1_b, text2_a, text2_b;
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
    const mid_common = hm[4];
    return [
        text1_a,
        text1_b,
        text2_a,
        text2_b,
        mid_common
    ];
}
function diff_cleanupMerge(_diffs) {
    const diffs = [
        ..._diffs
    ];
    diffs.push([
        0,
        ""
    ]);
    let pointer = 0;
    let count_delete = 0;
    let count_insert = 0;
    let text_delete = "";
    let text_insert = "";
    let commonlength;
    let previous_equality;
    while(pointer < diffs.length){
        if (pointer < diffs.length - 1 && !diffs[pointer][1]) {
            diffs.splice(pointer, 1);
            continue;
        }
        switch(diffs[pointer][0]){
            case 1:
                count_insert++;
                text_insert += diffs[pointer][1];
                pointer++;
                break;
            case DIFF_DELETE:
                count_delete++;
                text_delete += diffs[pointer][1];
                pointer++;
                break;
            case 0:
                previous_equality = pointer - count_insert - count_delete - 1;
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
                                diffs.splice(0, 0, [
                                    0,
                                    text_insert.substring(0, commonlength)
                                ]);
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
                    const n = count_insert + count_delete;
                    if (text_delete.length === 0 && text_insert.length === 0) {
                        diffs.splice(pointer - n, n);
                        pointer = pointer - n;
                    } else if (text_delete.length === 0) {
                        diffs.splice(pointer - n, n, [
                            1,
                            text_insert
                        ]);
                        pointer = pointer - n + 1;
                    } else if (text_insert.length === 0) {
                        diffs.splice(pointer - n, n, [
                            DIFF_DELETE,
                            text_delete
                        ]);
                        pointer = pointer - n + 1;
                    } else {
                        diffs.splice(pointer - n, n, [
                            DIFF_DELETE,
                            text_delete
                        ], [
                            1,
                            text_insert
                        ]);
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
    let changes = false;
    pointer = 1;
    while(pointer < diffs.length - 1){
        if (diffs[pointer - 1][0] === 0 && diffs[pointer + 1][0] === DIFF_EQUAL) {
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
        is_surrogate_pair_start;
    }
    if (changes) {
        ``;
        return diff_cleanupMerge(diffs);
    }
    return diffs;
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
    const ret = [];
    for(let i = 0; i < tuples.length; i++){
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
function find_cursor_edit_diff(oldText, newText, cursor_pos) {
    const oldRange = typeof cursor_pos === "number" ? {
        index: cursor_pos,
        length: 0
    } : cursor_pos.oldRange;
    const newRange = typeof cursor_pos === "number" ? null : cursor_pos.newRange;
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
            return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldAfter);
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
            return make_edit_splice(oldBefore, oldMiddle, newMiddle, oldSuffix);
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
            return make_edit_splice(oldPrefix, oldMiddle, newMiddle, oldSuffix);
        }
    }
    return null;
}
function diff(text1, text2, cursor_pos) {
    return diff_main({
        text1,
        text2,
        cursor_pos
    });
}
diff.INSERT = 1;
diff.DELETE = DIFF_DELETE;
diff.EQUAL = 0;
const document = window.document;
let monaco1 = null;
async function run() {
    await importScript("https://cdnjs.cloudflare.com/ajax/libs/core-js/3.6.5/minified.js");
    await importScript("https://unpkg.com/@babel/standalone@7.12.4/babel.min.js");
    await importScript("https://unpkg.com/react@17.0.1/umd/react.production.min.js");
    await importScript("https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js");
    await importScript("https://unpkg.com/interactjs@1.10.0/dist/interact.min.js");
    const searchRegExp = /import/gi;
    const replaceWith = "///";
    setTimeout(()=>makeDraggable()
    , 100);
    let latestGoodCode = "";
    const transpileCode = (code)=>window.Babel.transform(code, {
            plugins: [],
            presets: [
                "react",
                [
                    "typescript",
                    {
                        isTSX: true,
                        allExtensions: true
                    }
                ], 
            ]
        }).code.replace(/import/gi, "///")
    ;
    const restartCode = async (transpileCode1)=>{
        const restart = new Function("transpileCode", `return function(){ ${transpileCode1} }`)();
        const body = {
            codeTranspiled: transpileCode1,
            code: latestGoodCode
        };
        const stringBody = JSON.stringify(body);
        const request = new Request("https://code.zed.vision", {
            body: stringBody,
            method: "POST",
            headers: {
                "content-type": "application/json;charset=UTF-8"
            }
        });
        const response = await fetch(request);
        const { hash  } = await response.json();
        try {
            const localStorage = window.localStorage;
            const prevHash = localStorage.getItem("codeBoXHash");
            if (prevHash !== hash) {
                localStorage.setItem("codeBoXHash", hash);
                localStorage.setItem(hash, latestGoodCode);
                window.history.pushState({
                }, "", "/?h=" + hash);
            }
        } catch (e) {
            console.log("no localStorage");
        }
        restart();
    };
    let keystrokeTillNoError = 0;
    let latestCode = "";
    let errorReported = "";
    let busy = 0;
    (async ()=>{
        const example = getCodeToLoad();
        latestGoodCode = example;
        await startMonaco({
            language: "typescript",
            code: example,
            onChange: (code)=>{
                latestCode = code;
                const runner = async (cd)=>{
                    if (busy === 1) {
                        return;
                    }
                    busy = 1;
                    const err = await getErrors();
                    const errorDiv = document.getElementById("error");
                    try {
                        busy = 0;
                        if (cd !== latestCode) {
                            return;
                        }
                        if (err && err.length) {
                            if (latestCode != cd) {
                                return;
                            }
                            if (errorReported === cd) {
                                return;
                            }
                            document.getElementById("root").classList.add("transparent");
                            const slices = diff(latestGoodCode, cd, 0);
                            console.log(slices);
                            if (slices.length <= 3) {
                                monaco1.editor.setTheme("hc-black");
                                return;
                            }
                            errorDiv.innerHTML = err[0].messageText.toString();
                            document.getElementById("root").style.setProperty("dispay", "none");
                            errorDiv.style.display = "block";
                            errorReported = cd;
                            monaco1.editor.setTheme("vs-light");
                            setTimeout(()=>{
                                monaco1.editor.setTheme("hc-black");
                            }, keystrokeTillNoError++);
                            return;
                        }
                        latestGoodCode = cd;
                        errorDiv.style.display = "none";
                        window["monaco"].editor.setTheme("vs-dark");
                        document.getElementById("root").classList.remove("transparent");
                        keystrokeTillNoError = 0;
                        busy = 0;
                        restartCode(transpileCode(cd));
                    } catch (err) {
                        busy = 0;
                        if (cd !== latestCode) {
                            return;
                        }
                        monaco1.editor.setTheme("vs-light");
                        setTimeout(()=>{
                            window["monaco"].editor.setTheme("hc-black");
                        }, 10);
                        console.error(err);
                    }
                };
                if (!busy) {
                    runner(latestCode);
                } else {
                    const myCode = code;
                    const cl = setInterval(()=>{
                        if (code !== latestCode || !busy) {
                            clearInterval(cl);
                        }
                        if (!busy) {
                            runner(latestCode);
                        }
                    }, 100);
                }
            }
        });
        monaco1 = window["monaco"];
    })();
    restartCode(transpileCode(getCodeToLoad()));
    document.getElementById("root").setAttribute("style", "display:block");
    async function getErrors() {
        const modelUri = monaco1.Uri.parse("file:///main.tsx");
        getCodeToLoad;
        const tsWorker = await window["monaco"].languages.typescript.getTypeScriptWorker();
        const diag = await (await tsWorker(modelUri)).getSemanticDiagnostics("file:///main.tsx");
        const comp = await (await tsWorker(modelUri)).getCompilerOptionsDiagnostics("file:///main.tsx");
        const syntax = await (await tsWorker(modelUri)).getSyntacticDiagnostics("file:///main.tsx");
        return [
            ...diag,
            ...comp,
            ...syntax
        ];
    }
}
function getCodeToLoad() {
    const hash = window.localStorage.getItem("codeBoXHash");
    return window.localStorage.getItem(location.hash) || hash && window.localStorage.getItem(hash) || window.localStorage.getItem("STARTER") || `() => <>Hello</>`;
}
run();

