/** @jsxImportSource @emotion/react */

// import {CacheProvider } from "@emotion/react"
// import createCache, {EmotionCache, } from "@emotion/cache"
import { renderToString } from "react-dom/server";
import type { FC } from "react";

// const WithCache: FC<{children: ReactNode, cache: EmotionCache}> = ({children, cache}) => <CacheProvider value={cache}>{children}</CacheProvider>

export const renderFromString = async (App: FC) =>  {
  
  // const myCache =  createCache({
  //   prepend: true,
  //   key: 'css',
  //   stylisPlugins: [
  //   ]
  // });


return {
  html: renderToString( <App/>), 
  css: ""
};

}
