const loadApp = async () => {
  if (window.startedWithNativeEsmModules) return;
  console.log("... with ES-module-shims!");
  await import("es-module-shims");
};

setTimeout(loadApp, 200);
