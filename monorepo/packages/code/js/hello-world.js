(async () => {
  // const App = (await import(
  //   `https://spike.land/api/room/zoli/js`,
  // )).default;

  const applyDelta = (await import(
    "https://unpkg.com/@spike.land/esm@0.4.33/dist/textdiff-patch.mjs"
  )).default;

  const respS = await fetch(
    `https://spike.land/api/room/zoli/session`,
  );
  const session = await respS.json();

  const resp = await fetch(
    `https://spike.land/api/room/zoli/delta`,
  );
  const deltas = await resp.json();

  //   const { jsx } = emotionReact;

  //   const { ReactDOM } = window;

  const container = document.createElement("div");
  container.id = "upgrade-me";
  document.body.appendChild(container);

  //   const container = document.getElementById("upgrade-me") ;

  container.innerHTML =
    `<style>${session.css}</style><div id="zbodyw">${session.html}</div>`;

  //   const st = document.createElement("style");
  //   st.innerHTML = session.css;

  const html = session.html;
  //   const applied = applyDelta(html, deltas[0]);
  //   container.innerHTML = session.html;
  // `<style>${session.css}</style><div>${session.html}</div>`;

  //  const root = ReactDOM.createRoot(target);

  //   root.render(jsx(App));

  //   document.body.appendChild(st);

  //  document.body.appendChild(container);

  //   const zBody = container;

  let i = 0;
  let last = html;
  const deltasLength = deltas.length;
  setInterval(() => {
    const index = i % deltasLength;
    if (index === 0) last = html;
    //
    i++;
    const delta = deltas[index];
    if (!delta) return;
    const next = applyDelta(last, delta);
    last = next;

    // const newDiv = document.createElement("div");
    // newDiv.id = "zbodyw";
    // newDiv.setAttribute("id", "zbodyw");

    // newDiv.innerHTML = `<div>${next}</div>`;

    // document.getElementById("zbodyw").replaceWith(newDiv);
    // console.log(next);
    //    document.removeChild(container);
    console.log(next);
    container.innerHTML =
      `<style>${session.css}</style><div id="zbodyw">${next}</div>`;
  }, 1000 / 60);
  //  document.appendChild(container);
})();
