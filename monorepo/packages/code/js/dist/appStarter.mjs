import "./chunks/chunk-XHYF4LCB.mjs";

// js/appStarter.ts
var appStarter_default = async (injectedRoom = "") => {
  window.esmsInitOptions = {
    shimMode: true,
    polyfillEnable: ["css-modules", "json-modules"],
    onerror: (error) => console.log(error),
    fetch: async function(url, options) {
      const urlEnd = url.substr(-3);
      if (url.indexOf("monaco") === -1 && ["tsx", ".ts"].indexOf(urlEnd) !== -1) {
        console.log(url);
        const res = await fetch(url, options);
        if (!res.ok)
          return res;
        const source = await res.text();
        const { transform } = await import("./chunks/esbuildEsm-AMYOI2SL.mjs");
        const transformed = await transform(source);
        return new Response(new Blob([transformed], { type: "application/javascript" }));
      }
      return fetch(url, options);
    },
    noLoadEventRetriggers: true,
    skip: /^https?:\/\/(cdn\.skypack\.dev|jspm\.dev)\//
  };
  window.process = { env: { NODE_ENV: "production" } };
  await import("./chunks/es-module-shims.wasm-HLVRHS4O.mjs");
  const { importShim } = self;
  const { run } = await importShim("./dist/starter.mjs");
  run(injectedRoom);
  const { Workbox } = await importShim("workbox-window");
  const wb = new Workbox("./sw.js");
  wb.addEventListener("activated", async (event) => {
    if (!event.isUpdate) {
      console.log("Service worker activated for the first time!");
    }
  });
  wb.register();
};
export {
  appStarter_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiLi4vYXBwU3RhcnRlci50cyJdLAogICJzb3VyY2VzQ29udGVudCI6IFsiZXhwb3J0IGRlZmF1bHQgYXN5bmMgKGluamVjdGVkUm9vbSA9IFwiXCIpID0+IHtcbiAgd2luZG93LmVzbXNJbml0T3B0aW9ucyA9IHtcbiAgICBzaGltTW9kZTogdHJ1ZSxcbiAgICBwb2x5ZmlsbEVuYWJsZTogW1wiY3NzLW1vZHVsZXNcIiwgXCJqc29uLW1vZHVsZXNcIl0sXG4gICAgb25lcnJvcjogKGVycm9yKSA9PiBjb25zb2xlLmxvZyhlcnJvciksIC8vIGRlZmF1bHRzIHRvIGAoKGUpID0+IHsgdGhyb3cgZTsgfSlgXG4gICAgZmV0Y2g6IGFzeW5jIGZ1bmN0aW9uICh1cmwsIG9wdGlvbnMpIHtcbiAgICAgIGNvbnN0IHVybEVuZCA9IHVybC5zdWJzdHIoLTMpO1xuICAgICAgaWYgKFxuICAgICAgICB1cmwuaW5kZXhPZihcIm1vbmFjb1wiKSA9PT0gLTEgJiYgW1widHN4XCIsIFwiLnRzXCJdLmluZGV4T2YodXJsRW5kKSAhPT0gLTFcbiAgICAgICkge1xuICAgICAgICBjb25zb2xlLmxvZyh1cmwpO1xuICAgICAgICBjb25zdCByZXMgPSBhd2FpdCBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgICAgICBpZiAoIXJlcy5vaykgcmV0dXJuIHJlcztcblxuICAgICAgICBjb25zdCBzb3VyY2UgPSBhd2FpdCByZXMudGV4dCgpO1xuXG4gICAgICAgIGNvbnN0IHsgdHJhbnNmb3JtIH0gPSBhd2FpdCBpbXBvcnQoXCIuL2VzYnVpbGRFc20udHNcIik7XG4gICAgICAgIGNvbnN0IHRyYW5zZm9ybWVkID0gYXdhaXQgdHJhbnNmb3JtKHNvdXJjZSk7XG4gICAgICAgIHJldHVybiBuZXcgUmVzcG9uc2UoXG4gICAgICAgICAgbmV3IEJsb2IoW3RyYW5zZm9ybWVkXSwgeyB0eXBlOiBcImFwcGxpY2F0aW9uL2phdmFzY3JpcHRcIiB9KSxcbiAgICAgICAgKTtcbiAgICAgIH1cbiAgICAgIHJldHVybiBmZXRjaCh1cmwsIG9wdGlvbnMpO1xuICAgIH0sXG4gICAgbm9Mb2FkRXZlbnRSZXRyaWdnZXJzOiB0cnVlLFxuICAgIHNraXA6IC9eaHR0cHM/OlxcL1xcLyhjZG5cXC5za3lwYWNrXFwuZGV2fGpzcG1cXC5kZXYpXFwvLyxcbiAgfTtcblxuICB3aW5kb3cucHJvY2VzcyA9IHsgZW52OiB7IE5PREVfRU5WOiBcInByb2R1Y3Rpb25cIiB9IH07XG5cbiAgYXdhaXQgaW1wb3J0KFxuICAgIFwiZXMtbW9kdWxlLXNoaW1zL3dhc21cIlxuICApO1xuICBjb25zdCB7IGltcG9ydFNoaW0gfSA9IHNlbGY7XG4gIGNvbnN0IHsgcnVuIH0gPSBhd2FpdCBpbXBvcnRTaGltKFwiLi9kaXN0L3N0YXJ0ZXIubWpzXCIpO1xuICBydW4oaW5qZWN0ZWRSb29tKTtcblxuICBjb25zdCB7IFdvcmtib3ggfSA9IGF3YWl0IGltcG9ydFNoaW0oXCJ3b3JrYm94LXdpbmRvd1wiKTtcbiAgY29uc3Qgd2IgPSBuZXcgV29ya2JveChcIi4vc3cuanNcIik7XG4gIHdiLmFkZEV2ZW50TGlzdGVuZXIoXCJhY3RpdmF0ZWRcIiwgYXN5bmMgKGV2ZW50KSA9PiB7XG4gICAgaWYgKCFldmVudC5pc1VwZGF0ZSkge1xuICAgICAgY29uc29sZS5sb2coXCJTZXJ2aWNlIHdvcmtlciBhY3RpdmF0ZWQgZm9yIHRoZSBmaXJzdCB0aW1lIVwiKTtcbiAgICB9XG4gIH0pO1xuICB3Yi5yZWdpc3RlcigpO1xufTtcbiJdLAogICJtYXBwaW5ncyI6ICI7OztBQUFBLElBQU8scUJBQVEsT0FBTyxlQUFlLE9BQU87QUFDMUMsU0FBTyxrQkFBa0I7QUFBQSxJQUN2QixVQUFVO0FBQUEsSUFDVixnQkFBZ0IsQ0FBQyxlQUFlO0FBQUEsSUFDaEMsU0FBUyxDQUFDLFVBQVUsUUFBUSxJQUFJO0FBQUEsSUFDaEMsT0FBTyxlQUFnQixLQUFLLFNBQVM7QUFDbkMsWUFBTSxTQUFTLElBQUksT0FBTztBQUMxQixVQUNFLElBQUksUUFBUSxjQUFjLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUSxZQUFZLElBQ25FO0FBQ0EsZ0JBQVEsSUFBSTtBQUNaLGNBQU0sTUFBTSxNQUFNLE1BQU0sS0FBSztBQUM3QixZQUFJLENBQUMsSUFBSTtBQUFJLGlCQUFPO0FBRXBCLGNBQU0sU0FBUyxNQUFNLElBQUk7QUFFekIsY0FBTSxFQUFFLGNBQWMsTUFBTSxPQUFPO0FBQ25DLGNBQU0sY0FBYyxNQUFNLFVBQVU7QUFDcEMsZUFBTyxJQUFJLFNBQ1QsSUFBSSxLQUFLLENBQUMsY0FBYyxFQUFFLE1BQU07QUFBQTtBQUdwQyxhQUFPLE1BQU0sS0FBSztBQUFBO0FBQUEsSUFFcEIsdUJBQXVCO0FBQUEsSUFDdkIsTUFBTTtBQUFBO0FBR1IsU0FBTyxVQUFVLEVBQUUsS0FBSyxFQUFFLFVBQVU7QUFFcEMsUUFBTSxPQUNKO0FBRUYsUUFBTSxFQUFFLGVBQWU7QUFDdkIsUUFBTSxFQUFFLFFBQVEsTUFBTSxXQUFXO0FBQ2pDLE1BQUk7QUFFSixRQUFNLEVBQUUsWUFBWSxNQUFNLFdBQVc7QUFDckMsUUFBTSxLQUFLLElBQUksUUFBUTtBQUN2QixLQUFHLGlCQUFpQixhQUFhLE9BQU8sVUFBVTtBQUNoRCxRQUFJLENBQUMsTUFBTSxVQUFVO0FBQ25CLGNBQVEsSUFBSTtBQUFBO0FBQUE7QUFHaEIsS0FBRztBQUFBOyIsCiAgIm5hbWVzIjogW10KfQo=
