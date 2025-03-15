const emotionImport = `import {jsx as jsxRuntime} from "@emotion/react/jsx-runtime";\n`;
const replaceJsxElements = (str: string) => {
    return str.replace(/(<\/?[\w\s]+>|{[^}]+})/g, (match) => {
        if (!match.startsWith('</') && !match.endsWith('>')) { // Only process opening tags
            const tagParts = match.match(/<(\w+)([^>]*)>/);
            if (tagParts) {
                const tagName = tagParts[1];
                const attributes = tagParts[2] ? ` ${tagParts[2].replace(/=(['"])/g, `=$1`)} ` : '';
                return `jsxRuntime('${tagName}${attributes}')`;
            }
        }
        return match;
    });
};


export function tsxToMjs(input: string): string {
    // Save input to a temporary .tsx file
   
        let processedOutput = input.replace(/import\s+React.*$/, 'import type * as React from "react";');

        // Add the import for emotion's jsx runtime at the top
        processedOutput = emotionImport + processedOutput;

        // Replace all JSX elements with calls to the emotion jsx runtime
     
        processedOutput = replaceJsxElements(processedOutput);


        return processedOutput;

}
