import { CacheProvider } from '@emotion/react'
import React from "react"
import { renderToString } from 'react-dom/server'
import CRI from '@emotion/server/create-instance'
import createCache from '@emotion/cache'

export function getHtmlAndCss(App){

const key = "yoo";
const cache = createCache({ key })

const createEmotionServer = CRI.default;
const { extractCritical } = createEmotionServer(cache)

const element = React.createElement(
  CacheProvider,
  { value: cache },
  React.createElement(App, null)
);


const { html, css, ids } = extractCritical(renderToString(element))

return {html, css: `<style data-emotion="${key} ${ids.join(' ')}">${css}</style>`};

}

