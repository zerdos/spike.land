# Cloudflare Development Container

This development container provides a pre-configured environment for building and testing Cloudflare Workers.

## Getting Started

1.  **Open in Dev Containers:**
    *   Ensure you have the [Remote - Containers](https://marketplace.visualstudio.com/items?itemName=ms-vscode-remote.remote-containers) extension installed in VS Code.
    *   Open this folder (`cloudflare-devcontainer`) in VS Code.
    *   When prompted, click "Reopen in Container".

2.  **Install Dependencies (if any for your project):**
    *   Open a new terminal in VS Code (`Terminal > New Terminal`).
    *   Run `npm install` or `yarn install` if your Worker project has its own `package.json`.

3.  **Start Developing:**
    *   Use the `wrangler` CLI to develop, test, and deploy your Workers.
    *   For example, to start a local development server: `wrangler dev`
    *   This will typically run your Worker on `http://localhost:8787`.

## Included Software

*   **Node.js:** Latest LTS version.
*   **Wrangler:** The official CLI for Cloudflare Workers.
*   **Git:** For version control.

## VS Code Extensions

The following VS Code extensions are recommended and will be installed automatically:

*   `ms-vscode.node`: Node.js support.
*   `cloudflare.vscode-cloudflare-wrangler`: Cloudflare Wrangler extension for VS Code.

## Devcontainer Configuration

*   **Dockerfile:** Located at `devcontainers/cloudflare-devcontainer/Dockerfile`.
*   **Devcontainer JSON:** Located at `devcontainers/cloudflare-devcontainer/.devcontainer/devcontainer.json`.

## Cloudflare Workers Documentation

For more information on Cloudflare Workers and `wrangler`, please refer to the [official Cloudflare Workers documentation](https://developers.cloudflare.com/workers/).

## Contributing

If you have suggestions or improvements for this devcontainer, please feel free to contribute!
