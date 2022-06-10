const loadApp = async () => {
  console.log("es-module-shims import and start the app!");
  if (window.startedWithNativeEsmModules) return;

  await import("es-module-shims");
};

setTimeout(loadApp, 200);
WSH