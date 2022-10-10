(() => {
  self.addEventListener("install", (t) => {
    self.skipWaiting();
  });
  self.addEventListener("activate", (t) => {
    self.registration.unregister().then(() => self.clients.matchAll()).then(
      (n) => {
        for (const e of n) {
          e.navigate(e.url);
        }
      },
    );
  });
})();
