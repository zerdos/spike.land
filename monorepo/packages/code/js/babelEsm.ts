import { transform } from "@babel/standalone";

export const babelTransform = async (code: string) =>
  (transform(
    `
    import React from 'react';
    import { jsx } from '@emotion/react';
    
    ` + code,
    {
      compact: false,
      sourceType: "module",
      comments: false,

      presets: [
        "react",
        ["typescript", { isTSX: true, jsxPragma: "jsx", allExtensions: true }],
      ],
    },
  )).code || "";
