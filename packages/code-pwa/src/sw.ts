/// <reference lib="webworker" />
import { cleanupOutdatedCaches, createHandlerBoundToURL, precacheAndRoute } from 'workbox-precaching'
import { clientsClaim } from 'workbox-core'
import { NavigationRoute, registerRoute } from 'workbox-routing'

declare let self: ServiceWorkerGlobalScope

// self.__WB_MANIFEST is the default injection point
precacheAndRoute(self.__WB_MANIFEST)

// clean old assets
cleanupOutdatedCaches()

let allowlist: RegExp[] | undefined
// in dev mode, we disable precaching to avoid caching issues
if (import.meta.env.DEV)
  allowlist = [/^\/$/]

// to allow work offline
registerRoute(new NavigationRoute(
  createHandlerBoundToURL('index.html'),  
  { allowlist },
))

const mod = {
  i: 0
}

registerRoute(({url}) => url.pathname === '/special/url', async() => new Response(`${mod.i++} <!-- Look Ma. Added Content. -->`, {
    headers: { 'Content-Type': 'text/html' },
  })
);

registerRoute(({url}) => url.pathname === '/npm/react', async() => fetch('https://testing.spike.land/live/rca/index.tsx'));


self.skipWaiting()
clientsClaim()
