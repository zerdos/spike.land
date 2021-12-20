import { CacheProvider } from '@emotion/react'
import { renderToString } from 'react-dom/server'
import CRI from '@emotion/server/create-instance'
import createCache from '@emotion/cache'
import {jsx} from "@emotion/react"
import {v4} from "uuid";

export function getHtmlAndCss(App){
const key = v4();
const cache = createCache({ key })

const createEmotionServer = CRI.default;

const { extractCriticalToChunks, constructStyleTagsFromChunks } = createEmotionServer(cache)

const html = renderToString(
  jsx(CacheProvider, {value: cache, children: App})
)

const chunks = extractCriticalToChunks(html);
const styles = constructStyleTagsFromChunks(chunks);

return {html, css: styles};

}