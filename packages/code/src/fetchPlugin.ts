import { Plugin } from "esbuild-wasm"
export const fetchPlugin = (origin: string) => ({
  name: 'http',
  setup(build) {
    // Intercept import paths starting with "http:" and "https:" so
    // esbuild doesn't attempt to map them to a file system location.
    // Tag them with the "http-url" namespace to associate them with
    // this plugin.
    build.onResolve({ filter: /^https?:\/\// }, args => ({
      path: args.path,
      namespace: 'http-url',
    }))

    // We also want to intercept all import paths inside downloaded
    // files and resolve them against the original URL. All of these
    // files will be in the "http-url" namespace. Make sure to keep
    // the newly resolved URL in the "http-url" namespace so imports
    // inside it will also be resolved as URLs recursively.
    build.onResolve({ filter: /.*/, namespace: 'http-url' }, args => ({
      path: new URL(args.path, args.importer).toString(),
      namespace: 'http-url',
    }))

    // When a URL is loaded, we want to actually download the content
    // from the internet. This has just enough logic to be able to
    // handle the example import from unpkg.com but in reality this
    // would probably need to be more complex.
    build.onLoad({ filter: /.*/, namespace: 'http-url' }, async (args) => {
      let resolveDir;
      let type = 'text';  
      let contents = await new Promise((resolve, reject) => {
       
         fetch(new URL(args.path, origin).toString(), { redirect: 'follow' }).then(async (res) => {
          if (!res.ok) {
            reject(`HTTP error ${res.status}`)
            return
          }
          resolveDir = res.url;
          if (res === null) reject('Fetch failed');

          if (res.headers && res.headers.get('content-type') && res.headers.get('content-type')!.includes('application/json')) {
            type = 'json'
          }
          if (res.headers && res.headers.get('content-type') && res.headers.get('content-type')!.includes('text/html')) {
            type = 'html'
          }
          if (res.headers && res.headers.get('content-type') && res.headers.get('content-type')!.includes('text/css')) {
            type = 'css'
          }
          if (res.headers && res.headers.get('content-type') && res.headers.get('content-type')!.includes('application/javascript')) {
            type = 'js'
          }
          if (res.headers && res.headers.get('content-type') && res.headers.get('content-type')!.includes('image')) {
            type = 'image'
          }
      

          resolve(await res.text())
        }
        )
      }
      )

      return { contents, resolveDir, loader: type }
    })
  },
} as Plugin)

