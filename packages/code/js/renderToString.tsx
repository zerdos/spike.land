/** @jsx jsx */

/** @jsxImportSource @emotion/react */

import {  prettierHtml } from "./prettierEsm";
import {CacheProvider } from "@emotion/react"
import createCache, {EmotionCache, } from "@emotion/cache"
import { renderToString } from "react-dom/server";
import React, { Fragment, ReactNode } from "react";
import {jsx} from "@emotion/react"

const WithCache: React.FC<{children: React.ReactNode, cache: EmotionCache}> = ({children, cache}) => <CacheProvider value={cache}>{children}</CacheProvider>

export const renderFromString = async (App: ReactNode) =>  {
  const myCache =  createCache({
    prepend: true,
    key: 'my-prefix-key',
    stylisPlugins: [
      /* your plugins here */
    ]
  });

const AppWithCache = ()=><WithCache cache={myCache}>{App}</WithCache>

return {html:prettierHtml( renderToString(<AppWithCache />)), css: ""};
}
