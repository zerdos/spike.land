// import * as React from "react"
// import ReactDOM from "react-dom"

export const register = (code: string) => {
  if (typeof window === "undefined") {
    return () => ({
      innerHTML: "",
      code: "",
      compiledCode: "",
      events: [],
    });
  }

  const worker = new Worker("/workerComponent.js");

  const events = new Array(100000).fill({
    target: "+",
    type: "click",
  }) as any;

  // sha256Worker.port.postMessage({ hash: "7" })
  // const Counter = function Counter(props: { events: any }) {
  //   const actions = {
  //     decrease: (state: any) => ({ counter: state.counter - 1 }),
  //     double: (state: { counter: number }) => ({ counter: state.counter * 2 }),
  //     increase: (state: { counter: number }) => ({
  //       counter: state.counter + 1,
  //     }),
  //   }
  //   const events = props.events || []

  //   const [events, setEvents] = React.useState(events)

  //   const state = events
  //     .map((ev: { target: any }) => {
  //       const text = ev.target
  //       if (text.includes("-")) return "decrease"
  //       else if (text.includes("+")) return "increase"
  //       else if (text.includes("x2")) return "double"
  //       return null
  //     })
  //     .reduce((state: any, ev: string | number) => actions[ev](state), {
  //       counter: 0,
  //     })

  //   const onClick = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) =>
  //     setEvents([...events, { type: "click", target: String(e.target) }])

  //   return (
  //     <div>
  //       <button onClick={e => onClick(e)}>-</button>
  //       <button onClick={e => onClick(e)}>x2</button>
  //       Counter:<span>{state.counter}</span>
  //       <button onClick={e => onClick(e)}>+</button>
  //     </div>
  //   )
  // }

  worker.postMessage({
    code: code,
    events,
  });

  let el = document.createElement("div");

  const ret = {
    innerHTML: "",
    code: code,
    compiledCode: "",
    events: events,
  };

  // const React = (await import("react")).default
  // const ReactDOM = await import("react-dom")

  worker.onmessage = (d) => {
    if (d.data.domString) {
      // console.log(d.data.domString);
      // el = document.createElement("div")
      ret.innerHTML = d.data.domString;

      el.innerHTML = d.data.domString;
      document.getElementById("zoli")?.replaceWith(el);
      // document.body.appendChild(el)
      // if (reactEl) hydrate()
    }
    if (d.data.code) {
      ret.compiledCode = d.data.code;
      // const { code } = d.data

      // const React = (await import("react")).default
      // const ReactDOM = (await import("react-dom")).default
      // const cc = new Function(
      //   "props",
      //   "_React",
      //   `const React = _React; return (${code})(props)`
      // )

      // const cc = new Function("props", "React", `return (${code})(props)`)

      // const Counter = (props: any) => cc(props, React)

      // const ReactDOM = (await import("/react-dom.development.js")).default;

      // ReactDOM.hydrate(<Counter events={events} />, el)
    }
  };

  return () => ({ ...ret });
};
