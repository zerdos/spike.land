import { DevcontainerGenerator } from "@spike-npm-land/devcontainer-generator";
import { promises } from "fs";
const { writeFile } = promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("jammy");

  devGenerator.setNodeVersion("lts");
  devGenerator.setXfce();
  devGenerator.setZsh();
  devGenerator.setRemoteDesktop("noVNC");
  devGenerator.setChrome();
  // devGenerator.setDotnet6();
  devGenerator.setDeno();
  devGenerator.setCypress();
  devGenerator.setVscode();

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`./Dockerfile`, Dockerfile);

  await writeFile(`./README.md`, README);
};

run();
