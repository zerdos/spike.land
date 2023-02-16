fetch(
  "/ipfs/QmRX68ncYxZcPT9kzKUZotU6NDr92toosBcMCKHyywPony",
)
  .then((data) => data.text())
  .then(async (text) => {
    const App = (await import(URL.createObjectURL(
      new Blob([text], { type: "application/javascript" }),
    ))).default;

    getComputedStyle = function(e, t) {
      return this.el = e,
        this.getPropertyValue = function(t) {
          /** @type {RegExp} */
          var n = /(\-([a-z]){1})/g;
          return t === "float" && (t = "styleFloat"),
            n.test(t) && (t = t.replace(n, function(...rest) {
              return rest[2].toUpperCase();
            })),
            e.currentStyle[t] ? e.currentStyle[t] : null;
        },
        this;
    };

    const { renderEmotion } = await import(
      "https://unpkg.com/@spike.land/emotion-react-renderer/public/bundle.js"
    );

    renderEmotion(App(), document.getElementById("z-body"));
  });
