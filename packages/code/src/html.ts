export const version = `7.0.46`;
export const html = `<!DOCTYPE html>
<html>

<head>
  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">
  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">
  <meta content="utf-8" http-equiv="encoding">

  <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
  <script crossorigin src="https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js"></script>
  <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>
  <!-- <script crossorigin src="https://unpkg.com/jsframe.js@1.6.2/lib/jsframe.min.js"></script> -->
  <script crossorigin src="https://unpkg.com/framer-motion@2.9.4/dist/framer-motion.js"></script>

  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.1/normalize.min.css"
    crossorigin="anonymous" />

  <style>
    #container {
      background-color: #1e1e1e;
      width: 100vw;
      height: 100vh;
    }

    /* body {
      overflow: hidden;
      width: 100%;
      height: 100vh
    } */

    /* @keyframes opening {
      from {
        width: 10%;
        height: 20vh;
      }

      66% {
        width: 100%;
        height: 20vh;
      }

      to {
        width: 100%;
        height: 100vh;
      }
    } */


    #error {
      display: none;
      background-color: red;
      opacity: 0.7;
    }


    #ace {
      display: none;
    }


  

    #ace {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
    }


    .almosthidden {
      opacity: 0.5;
    }

    button {
      font-size: large;
    }
  </style>
</head>

<body>
  <div id="error" class="draggable"></div>
  
  <div id="container"></div>

  <div id="ace"></div>
  <script>
    

    if ('serviceWorker' in navigator) {
      navigator.serviceWorker.register('/sw.js').then(function () {
        console.log('service worker is is all cool.');
      }).catch(function (e) {
        console.error('service worker is not so cool.', e);
        throw e;
      });
    }
    // bling.js
    var $ = window.$ = document.querySelector.bind(document);
    var $$ = window.$$ = document.querySelectorAll.bind(document);
    Node.prototype.on = window.on = function (name, fn) {
      this.addEventListener(name, fn);
    }
    NodeList.prototype.__proto__ = Array.prototype;
    NodeList.prototype.on = NodeList.prototype.addEventListener = (function (name, fn) {
      this.forEach(function (elem) {
        elem.on(name, fn);
      });
   });


  </script>

  <script>
    window["motion"] = window["Motion"].motion;
    window["css"] = window["emotionReact"].css;
    window["jsx"] = window["emotionReact"].jsx;

    window["styled"] = window["emotionStyled"];

    //inject

    //inject

    async function restartCode(transpileCode) {

    const regex2 = /styled.div/gi;

    const replaced = transpileCode.replaceAll(regex2, "styled(motion.div)");
    console.log(replaced);
    const restart = new Function(
      "replaced",
      \`return function() {  
        \${replaced}
      }\`,
    )()
    restart();
  }

    

  </script>

  <script type="module">

    const runner = async () => {
      const version = "7.0.46";
      const cdnAddress = "https://unpkg.com/@zedvision/code@";
      const script = "/dist/_cBundle.js.min.js";


      if (window.location.href.includes("0.0.0.0") || window.location.href.includes("localhost")) {
        const { run } = await import("./dist/_cBundle.js")
        run();
      } else {
        const { run } = await import(cdnAddress + version + script)
         run();
      }


    }


    runner();
  </script>
</body>

</html>`;
export const sw = `var VERSION = '7';

this.addEventListener('install', function(e) {
  e.waitUntil(caches.open(VERSION).then(cache => {
    return cache.addAll([
      '/',
      '/sw.js',
    ]);
  }))
});

this.addEventListener('fetch', function(e) {
  var tryInCachesFirst = caches.open(VERSION).then(cache => {
    return cache.match(e.request).then(response => {
      if (!response) {
        return handleNoCacheMatch(e);
      }
      // Update cache record in the background
      fetchFromNetworkAndCache(e);
      // Reply with stale data
      return response
    });
  });
  e.respondWith(tryInCachesFirst);
});

this.addEventListener('activate', function(e) {
  e.waitUntil(caches.keys().then(keys => {
    return Promise.all(keys.map(key => {
      if (key !== VERSION)
        return caches.delete(key);
    }));
  }));
});

function fetchFromNetworkAndCache(e) {
  // DevTools opening will trigger these o-i-c requests, which this SW can't handle.
  // There's probably more going on here, but I'd rather just ignore this problem. :)
  // https://github.com/paulirish/caltrainschedule.io/issues/49
  if (e.request.cache === 'only-if-cached' && e.request.mode !== 'same-origin') return;

  return fetch(e.request).then(res => {
    // foreign requests may be res.type === 'opaque' and missing a url
    if (!res.url) return res;
    // regardless, we don't want to cache other origin's assets
    // if (new URL(res.url).origin !== location.origin) return res;

    return caches.open(VERSION).then(cache => {
      // TODO: figure out if the content is new and therefore the page needs a reload.
      cache.put(e.request, res.clone());
      return res;
    });
  }).catch(err => console.error(e.request.url, err));
}

function handleNoCacheMatch(e) {
  return fetchFromNetworkAndCache(e);
}`;
