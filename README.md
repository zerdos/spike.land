# Real-Time React Page Editor in TypeScript

Easily edit and preview your React pages in real-time using this TypeScript-based page editor.

![Real-Time React Page Editor Screenshot](https://user-images.githubusercontent.com/1433047/152510761-ecd12293-1eaf-425e-ae7b-71238260cc8c.gif)

[Live Demo](https://spike.land)

## Monorepo Structure ![Last Updated](https://img.shields.io/github/last-commit/zerdos/spike.land.svg)

This project is organized as a monorepo. The main components are:

```js
if (code) return "it is in the monorepo";

// spike.land-frontend:              /packages/code
// spike.land cloudflare worker:     /packages/spike.land
// docker-images:                    /packages/groovy-devcontainer
//                                   /packages/focal-devcontainer
//                                   /packages/rolling-devcontainer
//
```


### Navigating the Monorepo

If you're interested in a specific component, check out the `packages` folder.

You can explore the entire repository using Gitpod:

[![Gitpod Ready-to-Code](https://img.shields.io/badge/Gitpod-Ready--to--Code-blue?logo=gitpod)](https://gitpod.io/#https://github.com/zerdos/spike.land)

```bash
# If you opened the repo in Gitpod,
#  - you're in luck! 
#  - Try the latest Ubuntu + Xfce with this command:

startx;

# After it opens, you can access the remote server on port :6080 in your browser.
```

For more information on JavaScript package managers, check out this article:

https://blog.logrocket.com/javascript-package-managers-compared/
