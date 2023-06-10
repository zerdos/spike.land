import { oo } from "./importMap";

// Read the package.json file


// import {parseModule} from 'esprima'
// import {replace} from 'estraverse';
// import {generate} from 'escodegen';

// self.impTest = code => console.log(importMapReplace(code));

const debts: {
  [pkg: string]: Promise<{packageName: string, entry : string}>
} = {};

export async function importMapReplace(code: string, origin: string): Promise<string> {

  const topLevelImportPattern = /(import\s*(?:[\w{},*\s]+|[\w{} as,*\s]+|\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;

  // Matches top-level exports: export ... from "package"
  const topLevelExportPattern = /(export\s*(?:[\w{},*\s]+|[\w{} as,*\s]+|\w+)\s*from\s*)(['"`][^'`"]+['"`])/g;

  // Matches dynamic imports: import("package")
  const dynamicImportPattern = /(import\()(['"`][^'`"]+['"`]\))/g;

  // Replace function for all patterns
  const replacer =  (match: string, p1: string, p2: string) => {
    const packageName = p2.slice(1, -1); // Remove quotes
    if (packageName.startsWith(".") || packageName.startsWith("http")) {
      // Ignore relative and absolute URLs
      return match;
    }
    if (packageName.startsWith("/")) {

      // Ignore relative and absolute URLs
      return `${p1}'origin${packageName}'`;
    }

    if (!oo[packageName] && !debts[packageName] && (packageName.split("/").length < 3) && packageName.slice(-4).indexOf(".")===-1  ) {
      debts[packageName] = getBrowserEntry(packageName);
    }
    return `${p1}'${origin}/*${packageName}?bundle'`;
  };

  // Apply all replacements
  code = code
    .replace(topLevelImportPattern, replacer)
    .replace(topLevelExportPattern, replacer)
    .replace(dynamicImportPattern, replacer);

  // Apply custom mappings
  Object.keys(oo).forEach((pkg) => {
    code = code.split(`${origin}/*${pkg}?bundle`).join(origin + oo[pkg]);
  });

(await Promise.all(Object.keys(debts))).map(({packageName, entry})=>{

      if (entry && entry.length) {
        code = code.split(`${origin}/*${packageName}?bundle`).join(`${origin}/*${packageName}/${entry}?bundle`);
      }
    })

  return code;



  async function getBrowserEntry(packageName: string){

  const pkg = await (await fetch(`${origin}/${packageName}/package.json`)).json()
    
    
    
    
    
        // Default entry points
        let mainEntry = '';
        let moduleEntry = ''
        let browserEntry = ''
    
            // Check if the package.json has main, module, or browser fields
            if (pkg.main && pkg.main!=="index.js") {
                mainEntry = pkg.main;
            }
            if (pkg.module) {
                moduleEntry = pkg.module;
            }
            if (pkg.browser) {
                browserEntry = pkg.browser;
            }
    
            console.log(`Main entry point: ${mainEntry}`);
            console.log(`Module entry point: ${moduleEntry}`);
            console.log(`Browser entry point: ${browserEntry}`);
       if  (browserEntry) return{packageName, entry: browserEntry}
       if (moduleEntry) return {packageName, entry: moduleEntry}
       return {packageName, entry: mainEntry}
      }
      
    
    
}
