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
          "jsx": "r
          2weact-jsx",z
          "jsxImportSource": "@emotion/react"
        }
      },
      target: "es2021",
    });

return code;
}