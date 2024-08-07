import { routes } from "./routes";
import("./hydrate");

const paths = location.pathname.split("/").slice(1);

const redirect = routes[location.pathname as keyof typeof routes];

if (redirect || paths.length > 2 && paths[0] == "live") {
  const codeSpace = redirect || paths[1];
  const rootElement = document.getElementById("root")! as HTMLDivElement;
  import("./Wrapper").then(({ renderApp }) =>
    renderApp({ codeSpace, rootElement })
  );
}
