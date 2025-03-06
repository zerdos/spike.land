export interface ImportMap {
  imports: Record<string, string>;
}

export const importMap: ImportMap = {
  imports: {
    "/@/": "/@/",
    "@emotion/react/jsx-runtime": "/emotionJsxRuntime.mjs",
    "@emotion/react/jsx-dev-runtime": "/emotionJsxRuntime.mjs",
    "@emotion/styled": "/emotionStyled.mjs",
    "react/jsx-runtime": "/jsx.mjs",
    "react-dom/server": "/reactDomServer.mjs",
    "react-dom/client": "/reactDomClient.mjs",
    "@emotion/react": "/emotion.mjs",
    "react": "/reactMod.mjs",
    "framer-motion": "/@/workers/framer-motion.mjs",
    "react-dom": "/reactDom.mjs",
  },
};
