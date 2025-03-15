const emotionImport = `import { jsx } from "@emotion/react/jsx-runtime";\n`;

const replaceJsxElements = (str: string) => {
    return str.replace(
        /function\s+(\w+)\(\{([^}]+)\}(?:\s*:\s*[^{]+)?\)\s*{\s*return\s*\(([\s\S]*?)\);\s*}/g,
        (_, name, props, jsx) => {
            const div = jsx.match(/<div[^>]*>/)?.[0] || '';
            const attrs = div.match(/\s+([^>]*)/)?.[1] || '';
            
            return `const ${name} = React.forwardRef(({ ${props.replace(/:\s*[^,]+/g, '')} }, ref) =>\n` +
                   `  /* @__PURE__ */ jsx("div", {\n` +
                   `    ref,\n` +
                   `    ${attrs.split(/\s+/).map((attr:string) => {
                        if (attr.startsWith('data-slot=')) {
                            return '';
                        }
                        if (attr.startsWith('className=')) {
                            return `className: ${attr.split('=')[1].slice(1, -1)}`;
                        }
                        if (attr === '{...props}') {
                            return '...props';
                        }
                        return attr;
                    }).filter(Boolean).join(',\n    ')}\n` +
                   `  })\n);\n` +
                   `${name}.displayName = "${name}";`;
        }
    );
};

export function tsxToMjs(input: string): string {
    let processedOutput = input;
    
    // Handle imports first
    processedOutput = processedOutput.replace(/import\s+React.*$/m, 'import * as React from "react";');
    
    // Add emotion import at the top
    processedOutput = emotionImport + processedOutput;
    
    // Transform JSX to emotion jsx calls
    processedOutput = replaceJsxElements(processedOutput);
    
    return processedOutput;
}
