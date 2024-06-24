// Import necessary modules
import { mkdir } from "./memfs";

// Set up service worker version
// const { swVersion } = self;


// Create directories for the code space
const paths = location.pathname.split("/");
const codeSpace = paths[2];
const origin = location.origin.includes("localhost")? "https://testing.spike.land" : location.origin;

mkdir("/live").then(() => mkdir(`/live/${codeSpace}`));

// Check if on live page, and if so, run the code
if (location.pathname === `/live/${codeSpace}`) {
  import("./ws").then(({ run }) => run());
} else if (location.pathname === `/live/${codeSpace}/dehydrated`) {
  const BC = new BroadcastChannel(`${origin}/live/${codeSpace}/`);

  // Update HTML and CSS on message received
  BC.onmessage = ({ data }) => {
    const { html, css } = data;
    document.getElementById("root")!.innerHTML = [
      `<div id="${codeSpace}-css" style="height:100%;">`,
      "<style>",
      css,
      "</style>",
      html,
      "</div>",
    ].join("");
  };
} else {
  // Render the code
  // import { render } from "./render";
  import("./render").then(({ render }) =>
    {
    let divToRender = document.getElementById(`${codeSpace}-css`);
  if (!divToRender) {
    divToRender = document.createElement("div");
    divToRender.id = `${codeSpace}-css`;
    document.body.appendChild(document.getElementById('root')!);
  }


    render(
      divToRender,
      codeSpace,
    )
  }
  );
}
