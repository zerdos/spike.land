import * as React from "react";

import Graph from "./Graph";

// import html2canvas from 'html2canvas';

// import "./styles.css"
// // need to import the vis network css in order to show tooltip
// import "./network.css"

const getSvg = (div: string) =>
  '<svg xmlns="http://www.w3.org/2000/svg">' +
  // '<rect x="0" y="0" width="100%" height="100%" fill="#7890A7" stroke-width="20" stroke="#ffffff" ></rect>' +
  '<foreignObject x="0" y="0" width="100%" height="100%">' +
  '<div xmlns="http://www.w3.org/1999/xhtml" style="font-size:42px; border:1px solid black; text-align:center">' +
  div +
  "</div>" +
  "</foreignObject>" +
  "</svg>";

const getUrl = (div: string) =>
  "data:image/svg+xml;charset=utf-8," + encodeURIComponent(getSvg(div));

const App: React.FC<{
  nodes: {
    id: number;
    image: string;
    shape: string;
  }[];
  edges: {
    from: number;
    to: number;
    label: string;
  }[];
}> = ({ nodes, edges }) => {
  console.log(nodes);
  if (!nodes) return <React.Fragment></React.Fragment>;
  const graph = {
    nodes,
    edges,
  };

  const options = {
    layout: {
      hierarchical: false,
    },
    edges: {
      color: "#000000",
    },
  };

  const events = {
    select: function (event: any) {
      var { nodes, edges } = event;
      console.log("Selected nodes:");
      console.log(nodes);
      console.log("Selected edges:");
      console.log(edges);
    },
  };
  return (
    <Graph
      graph={graph}
      options={options}
      events={events}
      style={{ height: "640px" }}
    />
  );
};

const chd: React.FC<{
  Comp1: React.FC<{ onEvent: (s: string) => void }>;
}> = ({ Comp1 }) => {
  const [comps, setError] = React.useState([
    document.getElementById("id1")?.innerHTML || "<div></div>",
  ]);

  // const [{}, setLastEvent] = React.useState("init")

  const [{ nodes, edges }, setGraph] = React.useState({
    nodes: [
      { id: 0, image: "", shape: "image" },
    ],
    edges: [] as { from: number; to: number; label: string }[],
  });

  console.log({ nodes, edges });

  const check = (
    comps: string[],
    ev: string,
    setErr: (d: string[]) => void,
    currentHTML: string,
  ) => {
    const str = document.getElementById("id1")?.innerHTML || "<div></div>";
    console.log("LOOOOOOO", str, currentHTML);

    let newFn = [...comps, str];

    const old = [...comps];
    newFn.push(str);

    const num1 = Array.from(new Set(old));
    const num2 = Array.from(new Set(newFn));

    // newTom
    if (num1.length < num2.length) {
      // console.log(num1)
      // console.log(num2)
      // console.log("render", num1, num2)
      // console.log(lastEvent)

      // setLastEvent(ev)
      const from = num2.indexOf(currentHTML);
      const to = num2.indexOf(str);

      setGraph({
        nodes: [
          ...nodes,
          { id: nodes.length, image: getUrl(str), shape: "image" },
        ],
        edges: [...edges, { from, to, label: ev }],
      });

      setErr(num2);

      //setTimeout(() => check(num2, (d: string[]) => setError(d)), 100)
    } else {
      const from = num2.indexOf(currentHTML);
      const to = num2.indexOf(str);

      setGraph({
        nodes,
        edges: [...edges, { from, to, label: ev }],
      });

      /// setTimeout(() => check(num2, (d: string[]) => setError(d)), 100)
    }
  };

  React.useEffect(() => {
    //   html2canvas(document.getElementById("id1")!).then(function(canvas) {
    //     check(comps, "INIT", (d: string[]) => setError(d), canvas);

    //     // check(comps, "INIT", (d: string[]) => setError(d), original);
    //  });

    // console.log("useEffect")
    // const original = document.getElementById("id1")?.innerHTML || "";
    // setTimeout(() =>

    //);
    const original = document.getElementById("id1")?.innerHTML || "";
    // setTimeout(() =>
    check(comps, "INIT", (d: string[]) => setError(d), original);
  }, []);

  const rest = (
    <div>
      {comps.length &&
        comps.map((d) => (
          <div
            style={{ margin: 5, display: "inline-block" }}
            key={d}
            dangerouslySetInnerHTML={createMarkup(d || "uo")}
          />
        ))}
    </div>
  );

  return (
    <React.Fragment>
      <div style={{ margin: "10px", padding: "10px" }}>
        <div id="id1">
          <Comp1
            onEvent={(ev) => {
              const original = document.getElementById("id1")?.innerHTML || "";

              setTimeout(() =>
                check(comps, ev, (d: string[]) => setError(d), original)
              );
            }}
          />
        </div>
        <App nodes={nodes} edges={edges} />
      </div>
      <pre>{JSON.stringify(nodes)}</pre>
      {rest}
    </React.Fragment>
  );
};

function createMarkup(markup: string) {
  return { __html: markup };
}

export const ChangeDetector = typeof window !== "undefined"
  ? chd
  : () => <div>NO ssr</div>;
