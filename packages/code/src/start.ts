
    import("./hydrate");

    const paths = location.pathname.split("/").slice(1);

    if (paths.length > 2 && paths[0] == 'live') {
      const codeSpace = paths[1];
      const rootElement = document.getElementById("root")! as HTMLDivElement;
      import("./Wrapper").then(({renderApp}) =>renderApp({ codeSpace, rootElement}))
}