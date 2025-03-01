import { DevcontainerGenerator } from "@spike-npm-land/devcontainer-generator";
import { promises } from "fs";
const { writeFile } = promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("rolling")
  devGenerator.setNodeVersion("lts");
  devGenerator.setXfce();
  devGenerator.setDocker();
  devGenerator.setZsh();
  devGenerator.setRemoteDesktop("noVNC");
  // devGenerator.setDotnet("6");
  devGenerator.setDeno();
  devGenerator.setVscode();

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`./Dockerfile`, Dockerfile);

  await writeFile(`./README.md`, README);
};

run();
