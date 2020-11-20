var SHATEST: KVNamespace;

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET,HEAD,POST,OPTIONS",
  "Access-Control-Max-Age": "86400",
};

export async function handleCloudRequest(request: Request): Promise<Response> {
  if (request.method === "GET") {
    const url = new URL(request.url);

    if (request.url.includes("?h")) {
      const hash = url.searchParams.get("h");
      if (hash !== null) {
        const jsonStream = await SHATEST.get(hash, "stream");
        if (jsonStream !== null) {
          return new Response(jsonStream, {
            headers: {
              "content-type": "",
            },
          });
        }
      }
    }

    if (request.url.includes("?r")){

      return new Response(html, {
        headers: {
          "content-type": "text/html",
        },
      });

    }

    return Response.redirect("https://zed.vision/code", 301);
  } else if (request.method === "POST") {
    const data = (await request.json());

    const myBuffer = new TextEncoder().encode(JSON.stringify(data));

    const myDigest = await crypto!.subtle.digest(
      {
        name: "SHA-256",
      },
      myBuffer,
    );

    const hashArray = Array.from(new Uint8Array(myDigest));

    // convert bytes to hex string
    const hash = hashArray.map((b) => ("00" + b.toString(16)).slice(-2)).join(
      "",
    );
    const smallerKey = hash.substring(0, 8);
    await SHATEST.put(smallerKey, myBuffer);

    const resp = new Response(`{"hash":"${smallerKey}"}`);

    resp.headers.append("Access-Control-Allow-Origin", "*");
    resp.headers.append(
      "Access-Control-Allow-Methods",
      "GET,HEAD,POST,OPTIONS",
    );
    resp.headers.append("Access-Control-Max-Age", "86400");
    return resp;
  }

  return handleOptions(request);
}

function handleOptions(request: Request): Response {
  const headers = request.headers;

  let respHeaders = {
    ...headers,
    ...corsHeaders,
    "Access-Control-Allow-Headers": request.headers.get(
      "Access-Control-Request-Headers",
    ),
  };

  return new Response(request.body, {
    headers: respHeaders as any,
  });
}


const html = `<!DOCTYPE html>
      <html lang="en">
      <head>
      <script crossorigin src="https://unpkg.com/react@17.0.1/umd/react.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/react-dom@17.0.1/umd/react-dom.production.min.js"></script>
      <script crossorigin src="https://unpkg.com/@emotion/react@11.1.1/dist/emotion-react.umd.min.js"></script>
      <script crossorigin src="https://unpkg.com/@emotion/styled@11.0.0/dist/emotion-styled.umd.min.js"></script>
      <link rel="icon" href="data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAMAAABEpIrGAAAABGdBTUEAALGPC/xhBQAAACBjSFJNAAB6JgAAgIQAAPoAAACA6AAAdTAAAOpgAAA6mAAAF3CculE8AAABFFBMVEX/AAD/AAD/AAD/AAD/AAD/AAD/AAD/AAD/Bwf/ZGT/l5f/lpb/WFj/AwP/Li7/6ur/////3d3/Hx//Nzf/8vL/5+f/Jyf/zMz/9/f/9vb/9fX/+fn/39//IiL/QED/Pj7/Vlb/1dX/n5//Bgb/FRX/pKT//f3/ubn/ICD/Fxf/qan//v7/trb/GBj/qqr/srL/HR3/GRn/q6v/rq7/Gxv/Ghr/ra3/r6//paX/Fhb/sLD/oaH/FBT/HBz/sbH/nZ3/EhL//Pz/mJj/EBD/+vr/kZH/DQ3/g4P/vb3/QUH/MzP/NTX/ysr/9PT/7+//8fH/8PD/ycn/1tb/PT3/ERH/zc3/AQH/U1P/o6P/oqL/dHT/CwsnXuIzAAAAB3RSTlMRie2K+ev+okjQYAAAAAFiS0dEEJWyDSwAAAAHdElNRQfkCw8HNStlcP8AAAABA0lEQVQ4y42T11ICQRBFhziIoLiiSBCVjEjOIqCikiSoRP3//7Cma6mix+odz+s9s1vdt5oxk5mTmE2MWazcAKuF2bghNmY3FuyMK/iv4DhwHmJcbiQcHXskTjQknHpl4ewcCZrvwq8TCIIQwl/gl2Gdq+sbECJRYopYPCHyZIoYM32bEfndLpeFbA7yfIFYVLEE/y9XiE1WayLO5LLEqqt1yBtNoovKvcgTrQeirHYH8u4j0WY7L/Kn5x5Rdxrev7y+EXXzPsw3GI7GOgUs9N5BmExnc2Dm/Ughofkp1z35QsJiKQvTMRJW69Zmu8/m+0cacyVBtPkX9eEoT095vKrz/wWYHD/qOZ0BPQAAACV0RVh0ZGF0ZTpjcmVhdGUAMjAyMC0xMS0xNVQwNzo1Mzo0MyswMTowMKnrqaIAAAAldEVYdGRhdGU6bW9kaWZ5ADIwMjAtMTEtMTVUMDc6NTM6NDMrMDE6MDDYthEeAAAAV3pUWHRSYXcgcHJvZmlsZSB0eXBlIGlwdGMAAHic4/IMCHFWKCjKT8vMSeVSAAMjCy5jCxMjE0uTFAMTIESANMNkAyOzVCDL2NTIxMzEHMQHy4BIoEouAOoXEXTyQjWVAAAAAElFTkSuQmCC" />
    
      <style>
      html{
        background: white;
      }
      .css-18jmg8k { margin: 2em; display: inline-block; min-width: 200px; background: white; border: 4px dotted red; border-radius: 30px; padding: 1rem; }
  .css-1fvwkfh { text-align: center; display: inline-block; border-radius: 6px; padding: 0.5rem 0px; margin: 0.5rem 2rem; width: 4rem; background: green; color: white; border: none; }
  .css-1fvwkfh:focus { outline: none; }
  .css-1joydez { text-align: center; display: inline-block; border-radius: 6px; padding: 0.5rem 0px; margin: 0.5rem 2rem; width: 4rem; background: red; color: white; border: none; }
  .css-1joydez:focus { outline: none; }
      </style>
      </head>
      <body>
      <div id="root">
      <div class="css-18jmg8k"><h1>Counter example</h1><button class="css-1fvwkfh">-</button>0<button class="css-1joydez">+</button></div>
      </div>
      <script type="module">
      Object.assign(window, emotionReact);

     const styled = window["emotionStyled"];

      let DefaultElement;
        
      /** @jsx jsx */
/// { css, jsx } from "@emotion/react";

const Counter = () => {
  const [clicks, setClicks] = React.useState(0);
  return jsx("div", {
    css: containerStyles
  }, jsx("h1", null, "Counter example"), jsx("button", {
    css: buttonStyles("green"),
    onClick: () => setClicks(clicks - 1)
  }, "-"), clicks, jsx("button", {
    css: buttonStyles("red"),
    onClick: () => setClicks(clicks + 1)
  }, "+"));
};

const containerStyles = css\`
  margin: 2em;
  display: inline-block;
  min-width: 200px;
  background: white;
  border: 4px dotted red;
  border-radius: 30px;
  padding: 1rem;
\`;

const buttonStyles = color => css\`
  text-align: center;
  display: inline-block;
  border-radius: 6px;
  padding: 0.5rem 0;
  margin: 0.5rem 2rem;
  width: 4rem;
  background: \${color};
  color: white;
  border: none;
  :focus{
    outline: none;
  }
  \`;

DefaultElement =  Counter;

      ReactDOM.hydrate(jsx(DefaultElement), document.body.children[0]);
      </script>
      </body>
      </html>`;