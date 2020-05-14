import React from "react";
import { render } from "@testing-library/react";
import { App } from "./App";

test("renders learn react link", () => {
  const { getByText, baseElement } = render(<App />);
  const linkElement = getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
  expect(baseElement).toMatchInlineSnapshot(`
    <body>
      <div>
        <div
          class="App"
        >
          <header
            class="App-header"
          >
            <img
              alt="logo"
              class="App-logo"
              src="logo.svg"
            />
            <p>
              Edit 
              <code>
                src/App.tsx
              </code>
               and save to reload.
            </p>
            <a
              class="App-link"
              href="https://reactjs.org"
              rel="noopener noreferrer"
              target="_blank"
            >
              Learn React
            </a>
          </header>
        </div>
      </div>
    </body>
  `);
});
