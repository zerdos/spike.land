export const toUmd = async (source: string)=> {

const esbuild = await (await import("./esbuildEsm")).init()

  
const {code} =  await esbuild.transform(source, 
    {
      loader: "tsx",
      format: "iife",
      globalName: 'myAppp',
      treeShaking: true,
      tsconfigRaw: {
        "compilerOptions": {
          "jsx": "react-jsx",
          "jsxImportSource": "@emotion/react"
        }
      },
      target: "es2021",
    });

return code;
}