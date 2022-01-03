const target = document.createElement("div");
(async () => {
  // const App = (await import(
  //   `https://code.spike.land/api/room/zoli/js`,
  // )).default;

  const resp = await fetch(
    `https://code.spike.land/api/room/zoli/session`,
  );
  const session = await resp.json();

  //   const { jsx } = emotionReact;
  //   const { ReactDOM } = window;

  const container = document.createElement("div");

  container.innerHTML =
    `<iframe src="https://code.spike.land/api/room/zoli/hydrated"></iframe>`;
  // `<style>${session.css}</style><div>${session.html}</div>`;
  //   const root = ReactDOM.createRoot(target);

  //   root.render(jsx(App));

  document.body.appendChild(container);
})();
