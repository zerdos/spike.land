const html = (await Deno.readTextFile("index.html"));

const starterTsx = (await Deno.readTextFile("./src-deno/frontend/starter.tsx"));
const js = (await Deno.readTextFile("dist/_cBundle.js.min.js"));

const templates = {
  js: new TextEncoder().encode(js),
  html: new TextEncoder().encode(html),
  starterTsx: new TextEncoder().encode(starterTsx),
};

const out = await Deno.writeTextFile(
  "src/templates.js",
  `
const html = new Uint8Array([${templates.html}]);
 function starter(){ return new Uint8Array([${templates.starterTsx}])}
 function js(){
   return new Uint8Array([${templates.js}])
  }

 export function inject(startKey, start) {
    const htmlDecoded = new TextDecoder().decode(html);
    const jsDecoded = new TextDecoder().decode(js());
    const starterTsx = starter();
    const injectKey = startKey || "STARTER"
    const startCoded = typeof start === 'string' && new TextEncoder().encode(start);
    const inject = start? startCoded: starterTsx;

    const res = htmlDecoded.split("//inject")
    return [res[0], 
    "const injectCoded =  new Uint8Array(["+inject+"]); " ,
    "const inject = new TextDecoder().decode(injectCoded);",
    "localStorage.setItem(\`"+ injectKey +"\`, inject); ",
    jsDecoded, 
    res[2]].join(" ");
  }


 `,
);
