(() => {
  self.addEventListener("install", function (t) {
    self.skipWaiting();
  });
  self.addEventListener("activate", function (t) {
    self.registration.unregister().then(function () {
      return self.clients.matchAll();
    }).then(function (n) {
      n.forEach((e) => e.navigate(e.url));
    });
  });
})();
