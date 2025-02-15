import { defineConfig } from "  ";

export default defineConfig({
  /**
   * Configure a public assets directory.
   */
  publicDir: "public",

  /**
   * Set up a custom component to wrap around previewed components.
   *
   * Useful to set up context providers and global CSS.
   */
  wrapper: {
    path: "__previewjs__/Wrapper.tsx",
    componentName: "Wrapper",
  },

  /**
   * Specify a custom Vite configuration.
   *
   * See https://vitejs.dev/config.
   */
  vite: {
    resolve: {
      /**
       * Configure custom aliases (auto-detected if you use TypeScript).
       */
      alias: {
        foo: "src/foo",
      },
    },
  },
});