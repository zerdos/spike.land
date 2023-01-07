var __defProp = Object.defineProperty;
var __name = (target, value) => __defProp(target, "name", { value, configurable: true });
import { css } from "/src/emotion.mjs";
import { Fragment, jsx, jsxs } from "/src/emotionJsxRuntime.mjs";
const Box = /* @__PURE__ */ __name(({ children, boxRef, bg }) => {
  const background = bg || "#1D1F20";
  return /* @__PURE__ */ jsxs(
    "div",
    {
      ref: boxRef,
      css: css`
  --borderWidth: 8px;
  position: relative;
  margin: var(--borderWidth);
  background: ${background};
  position: relative;
  display: block;
  border-radius: var(--borderWidth);
  padding: var(--borderWidth);
`,
      children: [
        children,
        /* @__PURE__ */ jsx(
          "div",
          {
            css: css`
        content: '';
        position: absolute;
        top: calc(-1 * var(--borderWidth));
        left: calc(-1 * var(--borderWidth));
        height: calc(100% + var(--borderWidth) * 2);
        width: calc(100% + var(--borderWidth) * 2);
        background: linear-gradient(60deg, #f79533, #f37055, #ef4e7b, #a166ab, #5073b8, #1098ad, #07b39b, #6fba82);
        border-radius: calc(2 * var(--borderWidth));
        z-index: -1;
        animation: animatedgradient 3s ease alternate infinite;
        background-size: 300% 300%;
        @keyframes animatedgradient {
          0% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
          100% {
            background-position: 0% 50%;
          }
        }


      `,
          },
        ),
      ],
    },
  );
}, "Box");
const App = /* @__PURE__ */ __name(() => {
  return /* @__PURE__ */ jsxs("div", {
    children: [
      /* @__PURE__ */ jsx(Box, {
        children: /* @__PURE__ */ jsx(
          "div",
          {
            css: css`
              font-size: 5em;
        `,
            children: "\u{1F525}",
          },
        ),
      }, 1988),
      /* @__PURE__ */ jsxs("p", {
        children: [
          "Hey:)! Try to modify ",
          /* @__PURE__ */ jsx("code", { children: "this" }),
          " page.",
        ],
      }),
      /* @__PURE__ */ jsx(Box, {
        bg: "transparent",
        children: /* @__PURE__ */ jsx(
          "a",
          {
            css: css`
        color:orange;
      `,
            href: location.pathname.split("/").slice(0, 3).join("/"),
            children: "Open the editor",
          },
        ),
      }, 3),
    ],
  });
}, "App");
var stdin_default = /* @__PURE__ */ __name(() =>
  /* @__PURE__ */ jsx(Fragment, {
    children: /* @__PURE__ */ jsx(
      "div",
      {
        css: css`
          font-size: 2em;
          height: 100%;
          display: flex;
          justify-content: center;
          text-align: center;
          align-items: center;
          justify-items: space-evenly;
          flex-direction: column;
       `,
        children: /* @__PURE__ */ jsx(App, {}),
      },
    ),
  }), "default");
export { Box, stdin_default as default };
