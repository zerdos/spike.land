const cacheName = 'code-7.0.0';

self.addEventListener('install', e => {
    e.waitUntil(
        caches.open(cacheName).then(cache => {
            return cache.addAll([
                '/index.html'
            ])
                .then(() => self.skipWaiting());
        })
    );
});

self.addEventListener('activate', event => {
    event.waitUntil(self.clients.claim());
});

self.addEventListener('fetch', (event) => {
    event.respondWith(
        (async () => {
            const offlineCache = await caches.open(cacheName);
            const cachedRespond = await offlineCache.match(event.request, { ignoreSearch: true })
            const resp = cachedRespond || fetch(event.request);
            if (resp !== cachedRespond) setTimeout(()=>offlineCache.add(event.request.url));

            return resp;
        })()
    );

});