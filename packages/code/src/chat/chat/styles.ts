import { css } from "@emotion/react";

export const styles = {
  smallFont: css`
    font-size: 8pt !important;
  `,
  smallFontWithMaxWidth: css`
    font-size: 8pt !important;
    font-family: monospace;
    max-width: 100%;
  `,
  chatWindow: css`
    z-index: 999;
    transition: width 0.3s ease-in-out, transform 0.3s ease-in-out;
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    max-width: 100%;
    overflow-x: hidden;
    overflow-y: hidden;
    background-color: var(--background);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);

    @media (min-width: 768px) {
      width: 50%;
      max-width: 640px;
    }
  `,
  chatContent: css`
    height: 100%;
    min-width: 640px;
    width: 100%;
    border-left: 1px solid var(--input);
    overflow-x: auto;
    overflow-y: hidden;
    background-color: #f0f0f0;
  `,
};
