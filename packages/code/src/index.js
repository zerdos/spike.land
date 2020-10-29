const defaultExample = `import * as React from "react";\nimport ReactDOM from "react-dom";\n\nconst Counter = (\n    { initial = 0 }\n) => {\n    const [clicks, setClicks] = React.useState(initial);\n\n    return <div>\n        <p>Clicks: <strong>{clicks}</strong></p>\n        <button onClick={() => setClicks(clicks + 1)}>+</button>\n        <button onClick={() => setClicks(clicks - 1)}>-</button>\n    </div>;\n};\n\nReactDOM.render(\n    <Counter initial={0} />,\n    document.getElementById("root")\n);\n`;
const html = (_injection = "")=>`<!DOCTYPE html>\n<html>\n<head>\n  <meta content="text/html;charset=utf-8" http-equiv="Content-Type">\n  <meta name="viewport" content="width=device-width,user-scalable=no,initial-scale=1">\n  <meta content="utf-8" http-equiv="encoding">\n\n \n  <style>\n    html,\n    body,\n    div,\n    span,\n    applet,\n    object,\n    iframe,\n    h1,\n    h2,\n    h3,\n    h4,\n    h5,\n    h6,\n    p,\n    blockquote,\n    pre,\n    a,\n    abbr,\n    acronym,\n    address,\n    big,\n    cite,\n    code,\n    del,\n    dfn,\n    em,\n    img,\n    ins,\n    kbd,\n    q,\n    s,\n    samp,\n    small,\n    strike,\n    strong,\n    sub,\n    sup,\n    tt,\n    var,\n    b,\n    u,\n    i,\n    center,\n    dl,\n    dt,\n    dd,\n    ol,\n    ul,\n    li,\n    fieldset,\n    form,\n    label,\n    legend,\n    table,\n    caption,\n    tbody,\n    tfoot,\n    thead,\n    tr,\n    th,\n    td,\n    article,\n    aside,\n    canvas,\n    details,\n    embed,\n    figure,\n    figcaption,\n    footer,\n    header,\n    hgroup,\n    menu,\n    nav,\n    output,\n    ruby,\n    section,\n    summary,\n    time,\n    mark,\n    audio,\n    video {\n      margin: 0;\n      padding: 0;\n      border: 0;\n      font-size: 100%;\n      font: inherit;\n      vertical-align: baseline\n    }\n\n    article,\n    aside,\n    details,\n    figcaption,\n    figure,\n    footer,\n    header,\n    hgroup,\n    menu,\n    nav,\n    section {\n      display: block\n    }\n\n    body {\n      line-height: 1\n    }\n\n    ol,\n    ul {\n      list-style: none\n    }\n\n    blockquote,\n    q {\n      quotes: none\n    }\n\n    blockquote:before,\n    blockquote:after,\n    q:before,\n    q:after {\n      content: '';\n      content: none\n    }\n\n    table {\n      border-collapse: collapse;\n      border-spacing: 0\n    }\n\n    #container {\n      background-color: #1E1E1E;\n      width: 100vw;\n      height: 100vh;\n      animation-duration: 1s;\n      animation-name: opening;\n    }\n\n    body {\n      overflow: hidden;\n      width: 100%;\n      height: 100vh;\n    }\n\n    @keyframes opening {\n      from {\n        width: 10%;\n        height: 20vh;\n      }\n\n      66% {\n        width: 100%;\n        height: 20vh;\n      }\n\n      to {\n        width: 100%;\n        height: 100vh;\n      }\n    }\n\n\n    #error {\n      display: none;\n      background-color: red;\n      opacity: 0.7;\n    }\n\n    #root {\n      display: none;\n    }\n\n    .draggable {\n      margin: 24px;\n      padding: 32px;\n      position: absolute;\n      touch-action: none;\n      overflow: hidden;\n      z-index: 2;\n      word-wrap: break-word;\n      right: 24px;\n      /* float: right; */\n      /* top: 24px; */\n      /* right: 24px ; */\n      -webkit-transform: translate(0px, 0px);\n      transform: translate(0px, 0px);\n      font-size: 32px;\n      background-color: #ddd;\n      border-radius: 16px;\n      width: fit-content;\n      max-width: 40vw;\n      background: #ddd;\n      box-shadow:\n        0 2.8px 2.2px rgba(0, 0, 0, 0.034),\n        0 6.7px 5.3px rgba(0, 0, 0, 0.048),\n        0 12.5px 10px rgba(0, 0, 0, 0.06),\n        0 22.3px 17.9px rgba(0, 0, 0, 0.072),\n        0 41.8px 33.4px rgba(0, 0, 0, 0.086),\n        0 100px 80px rgba(0, 0, 0, 0.12);\n    }\n\n    .almosthidden {\n      opacity: 0.5;\n    }\n\n    button {\n      font-size: large;\n    }\n  </style>\n\n</head>\n<body>\n  <div id="error" class="draggable"></div>\n  <div id="root" class="draggable resize-drag"></div>\n  <div id="container"></div>\n  <script type="module">\n  ` + _injection + ` \n  </script>\n  <script type="module">\n    import {startMonaco} from "https://unpkg.com/@zedvision/smart-monaco-editor@6.2.3/lib/editor.js"\n    import {run} from "https://unpkg.com/@zedvision/code@6.1.2/code.zed-vision.min.js"\n    run(startMonaco);\n  </script>\n</body>\n</html>`
;
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
const getInject = (componentToStart, hash)=>{
    if (componentToStart.length < 5) return null;
    const startComponent = "`" + componentToStart + "`";
    return `localStorage.setItem("codeBoXHash", "${hash}"); \nlocalStorage.setItem("${hash}", ${startComponent});`;
};
async function handleRequest(request) {
    if (request.method === "GET") {
        const { hash  } = new URL(request.url);
        let inject = null;
        if (hash !== null && hash.length > 5) {
            const json = await SHATEST.get(hash.substr(1));
            if (json !== null) {
                inject = getInject(JSON.parse(json).code, hash.substr(1));
            }
        }
        if (inject === null) inject = getInject(defaultExample, "startHash");
        return new Response(html(inject), {
            headers: {
                "content-type": "text/html"
            }
        });
    } else if (request.method === "POST") {
        const { headers  } = request;
        const data = await request.json();
        const myBuffer = new TextEncoder().encode(JSON.stringify(data));
        const myDigest = await crypto.subtle.digest({
            name: "SHA-256"
        }, myBuffer);
        const hashArray = Array.from(new Uint8Array(myDigest));
        const hash = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
        ).join("");
        const smallerKey = hash.substring(0, 7);
        SHATEST.put(smallerKey, myBuffer);
        const resp = new Response(`{"hash":"${smallerKey}"}`);
        resp.headers.append("Access-Control-Allow-Origin", "*");
        resp.headers.append("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS");
        resp.headers.append("Access-Control-Max-Age", "86400");
        return resp;
    }
    return handleOptions(request);
}
function handleOptions(request) {
    let headers;
    let respHeaders;
    return new Response(request.body, {
        headers: {
            ...request.headers,
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
        }
    });
}
addEventListener("fetch", (event)=>{
    event.respondWith(handleRequest(event.request));
});
