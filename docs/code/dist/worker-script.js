var SHATEST;
const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
    "Access-Control-Max-Age": "86400"
};
async function handleCloudRequest(request) {
    if (request.method === "GET") {
        const url = new URL(request.url);
        if (request.url.includes("?h")) {
            const hash = url.searchParams.get("h");
            if (hash !== null) {
                const jsonStream = await SHATEST.get(hash, "stream");
                if (jsonStream !== null) {
                    return new Response(jsonStream, {
                        headers: {
                            "content-type": ""
                        }
                    });
                }
            }
        }
        if (request.url.includes("?r")) {
            return new Response(html, {
                headers: {
                    "content-type": "text/html"
                }
            });
        }
        return Response.redirect("https://zed.vision/code", 301);
    } else if (request.method === "POST") {
        const data = await request.json();
        const myBuffer = new TextEncoder().encode(JSON.stringify(data));
        const myDigest = await crypto.subtle.digest({
            name: "SHA-256"
        }, myBuffer);
        const hashArray = Array.from(new Uint8Array(myDigest));
        const hash = hashArray.map((b)=>("00" + b.toString(16)).slice(-2)
        ).join("");
        const smallerKey = hash.substring(0, 8);
        await SHATEST.put(smallerKey, myBuffer);
        const resp = new Response(`{"hash":"${smallerKey}"}`);
        resp.headers.append("Access-Control-Allow-Origin", "*");
        resp.headers.append("Access-Control-Allow-Methods", "GET,HEAD,POST,OPTIONS");
        resp.headers.append("Access-Control-Max-Age", "86400");
        return resp;
    }
    return handleOptions(request);
}
function handleOptions(request) {
    const headers = request.headers;
    let respHeaders;
    return new Response(request.body, {
        headers: {
            ...headers,
            ...corsHeaders,
            "Access-Control-Allow-Headers": request.headers.get("Access-Control-Request-Headers")
        }
    });
}
const html = `<!DOCTYPE html>\n      <html lang="en">\n      <head>\n      <link rel="icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABFFBMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/Bwf/ZGT/l5f/lpb/WFj/AwP/Li7/6ur/////3d3/Hx//Nzf/8vL/5+f/Jyf/zMz/9/f/9vb/9fX/+fn/39//IiL/QED/Pj7/Vlb/1dX/n5//Bgb/FRX/pKT//f3/ubn/ICD/Fxf/qan//v7/trb/GBj/qqr/srL/HR3/GRn/q6v/rq7/Gxv/Ghr/ra3/r6//paX/Fhb/sLD/oaH/FBT/HBz/sbH/nZ3/EhL//Pz/mJj/EBD/+vr/kZH/DQ3/g4P/vb3/QUH/MzP/NTX/ysr/9PT/7+//8fH/8PD/ycn/1tb/PT3/ERH/zc3/AQH/U1P/o6P/oqL/dHT/CwsnXuIzAAAAB3RSTlMRie2K+ev+okjQYAAAAAFiS0dEEJWyDSwAAAAHdElNRQfkCw8HNStlcP8AAAABA0lEQVQ4y42T11ICQRBFhziIoLiiSBCVjEjOIqCikiSoRP3//7Cma6mix+odz+s9s1vdt5oxk5mTmE2MWazcAKuF2bghNmY3FuyMK/iv4DhwHmJcbiQcHXskTjQknHpl4ewcCZrvwq8TCIIQwl/gl2Gdq+sbECJRYopYPCHyZIoYM32bEfndLpeFbA7yfIFYVLEE/y9XiE1WayLO5LLEqqt1yBtNoovKvcgTrQeirHYH8u4j0WY7L/Kn5x5Rdxrev7y+EXXzPsw3GI7GOgUs9N5BmExnc2Dm/Ughofkp1z35QsJiKQvTMRJW69Zmu8/m+0cacyVBtPkX9eEoT095vKrz/wWYHD/qOZ0BPQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0xNVQwNzo1Mzo0MyswMTowMKnrqaIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMTVUMDc6NTM6NDMrMDE6MDDYthEeAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC" />\n    \n      <style>\n      html{\n        background: white;\n      }\n      .css-18jmg8k { margin: 2em; display: inline-block; min-width: 200px; background: white; border: 4px dotted red; border-radius: 30px; padding: 1rem; }\n  .css-1fvwkfh { text-align: center; display: inline-block; border-radius: 6px; padding: 0.5rem 0px; margin: 0.5rem 2rem; width: 4rem; background: green; color: white; border: none; }\n  .css-1fvwkfh:focus { outline: none; }\n  .css-1joydez { text-align: center; display: inline-block; border-radius: 6px; padding: 0.5rem 0px; margin: 0.5rem 2rem; width: 4rem; background: red; color: white; border: none; }\n  .css-1joydez:focus { outline: none; }\n      </style>\n      </head>\n      <body>\n      <div id="root">\n      <div class="css-18jmg8k"><h1>Counter example</h1><button class="css-1fvwkfh">-</button>0<button class="css-1joydez">+</button></div>\n      </div>\n      <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>\n      <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>\n      <script crossorigin src="https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js"></script>\n      <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>\n      <script type="module">\n      Object.assign(window, emotionReact);\n\n     const styled = window["emotionStyled"];\n\n      let DefaultElement;\n        \n      /** @jsx jsx */\n/// { css, jsx } from "@emotion/react";\n\nconst Counter = () => {\n  const [clicks, setClicks] = React.useState(0);\n  return jsx("div", {\n    css: containerStyles\n  }, jsx("h1", null, "Counter example"), jsx("button", {\n    css: buttonStyles("green"),\n    onClick: () => setClicks(clicks - 1)\n  }, "-"), clicks, jsx("button", {\n    css: buttonStyles("red"),\n    onClick: () => setClicks(clicks + 1)\n  }, "+"));\n};\n\nconst containerStyles = css\`\n  margin: 2em;\n  display: inline-block;\n  min-width: 200px;\n  background: white;\n  border: 4px dotted red;\n  border-radius: 30px;\n  padding: 1rem;\n\`;\n\nconst buttonStyles = color => css\`\n  text-align: center;\n  display: inline-block;\n  border-radius: 6px;\n  padding: 0.5rem 0;\n  margin: 0.5rem 2rem;\n  width: 4rem;\n  background: \${color};\n  color: white;\n  border: none;\n  :focus{\n    outline: none;\n  }\n  \`;\n\nDefaultElement =  Counter;\n\n      ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);\n      </script>\n      </body>\n      </html>`;
self.runner = self.runner || "worker-cf";
addEventListener("fetch", (event)=>{
    if (self.runner !== "worker-cf") return;
    event.respondWith(handleCloudRequest(event.request));
});
