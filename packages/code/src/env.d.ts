/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly DEV: boolean;
  // Add other env variables as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
