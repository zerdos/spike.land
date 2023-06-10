import { oo } from "./importMap";


// import {parseModule} from 'esprima'
// import {replace} from 'estraverse';
// import {generate} from 'escodegen';

self.impTest = code => console.log(importMapReplace(code));


// export function importMapReplace(code: string): string {
//   // Parse the code into an AST
//   const ast = parseModule(code, { tokens: true, range: true });

//   // Traverse and modify the AST
//   replace(ast, {
//     enter(node) {
//       if (node.type === 'ImportDeclaration' || node.type === 'ExportNamedDeclaration' || node.type === 'ExportAllDeclaration') {
//         // This is an import or export statement
//         if (node.source && typeof node.source.value === 'string') {
//           const packageName = node.source.value;
//           if (!packageName.startsWith('.') && !packageName.startsWith('http')) {
//             // This is a package import/export, not a relative or absolute URL
//             node.source.value = `origin/*${packageName}?bundle`;
//           }
//         }
//       } else if (node.type === 'CallExpression' && node.callee.type === 'ImportExpression' && node.arguments.length > 0 && node.arguments[0].type === 'Literal') {
//         // This is a dynamic import
//         const packageName = node.arguments[0].value;
//         if (typeof packageName === 'string' && !packageName.startsWith('.') && !packageName.startsWith('http')) {
//           // This is a package import, not a relative or absolute URL
//           node.arguments[0].value = `origin/*${packageName}?bundle`;
//         }
//       }
//     }
//   });

//   // Apply custom mappings
//   replace(ast, {
//     enter(node) {
//       if (node.type === 'Literal' && typeof node.value === 'string') {
//         Object.keys(oo).forEach((pkg) => {
//           if (node.value === `/*${pkg}?bundle`) {
//             node.value = oo[pkg];
//           }
//         });
//       }
//     }
//   });

//   // Generate the modified code from the AST
//   const modifiedCode = generate(ast);

//   return modifiedCode;
// }

export function importMapReplace(code: string): string {
  const topLevelImportPattern = /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s]+|\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;

  // Matches top-level exports: export ... from "package"
  const topLevelExportPattern = /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s]+|\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;

  // Matches dynamic imports: import("package")
  const dynamicImportPattern = /(import\()(['"`][^'`"]+['"`]\))/g;

  // Replace function for all patterns
  const replacer = (match: string, p1: string, p2: string) => {
    const packageName = p2.slice(1, -1); // Remove quotes
    if (packageName.startsWith(".") || packageName.startsWith("http")) {
      // Ignore relative and absolute URLs
      return match;
    }
    if (packageName.startsWith("/")) {
      // Ignore relative and absolute URLs
      return `${p1}'origin${packageName}'`;
    }
    return `${p1}'origin/*${packageName}?bundle'`;
  };

  // Apply all replacements
  code = code
    .replace(topLevelImportPattern, replacer)
    .replace(topLevelExportPattern, replacer)
    .replace(dynamicImportPattern, replacer);

  // Apply custom mappings
  Object.keys(oo).forEach((pkg) => {
    code = code.split(`origin/*${pkg}?bundle`).join(oo[pkg]);
  });

  return code;
}
