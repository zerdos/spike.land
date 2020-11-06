const registerSW = async () => {
  try {
    if (
      location.hostname === "localhost" ||
      location.hostname === "127.0.0.1"
    ) {
      navigator.serviceWorker.getRegistrations().then(function (registrations) {
        for (let registration of registrations) {
          registration.unregister();
        }
      });
      return;
    }

    // const reg = await navigator.serviceWorker.register("/sw.js", {
    //   updateViaCache: "imports",
    //   scope: "/",
    // });

    // console.log("Registration succeeded. Scope is " + reg.scope);
  } catch (error) {
    console.log("Registration failed with " + error);
  }
};

if ("serviceWorker" in navigator) {
  console.log("adding event listener for lad");
  window.addEventListener("load", () => registerSW());
}
