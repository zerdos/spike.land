export const registerSW = async () => {
  try {
    if (
      (window.location.hostname === "localhost" ||
        window.location.hostname === "127.0.0.1" ||
        window.location.hostname === "0.0.0.0") &&
      "serviceWorker" in navigator
    ) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
      return;
    }

    await navigator.serviceWorker.register("/service-worker.js", {
      updateViaCache: "imports",
      scope: "/",
    });

    // console.log("Registration succeeded. Scope is " + reg.scope);
  } catch (error) {
    console.log("Registration failed with " + error);
  }
  if ("serviceWorker" in navigator) {
    window.addEventListener("load", () => registerSW());
  }
};
