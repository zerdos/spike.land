const html =(await Deno.readTextFile("./index.html"));
const starterTsx = (await Deno.readTextFile("./starter.tsx"));
const js = (await Deno.readTextFile("./code-box-bundle.js"));

const templates = {js: new TextEncoder().encode(js),
                  html: new TextEncoder().encode(html), 
                  starterTsx: new TextEncoder().encode(starterTsx)
                }


const out = await Deno.writeTextFile("src-deno/html.js", `
const html = new Uint8Array([${templates.html}]);
 function starter(){ return new Uint8Array([${templates.starterTsx}])}
 function js(){
   return new Uint8Array([${templates.js}])
  }

 export function inject(startKey, start) {
    const htmlDecoded = new TextDecoder().decode(html);
    const jsDecoded = new TextDecoder().decode(js());
    const starterTsx = new TextDecoder().decode(starter())
    const injectKey = startKey || "STARTER"
    const inject = start || starterTsx;

    const res = htmlDecoded.split("//inject")
    return [res[0], "localStorage.setItem(\`"+ injectKey +"\`, \`" + inject +"\`)", "; ",jsDecoded, res[1]].join(" ");
  }


 `);

 
