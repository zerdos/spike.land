import { DevcontainerGenerator } from "@spike.land/devcontainer-generator";
import { promises } from "fs";
const { writeFile } = promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("hirsute");

  devGenerator.setNodeVersion("current");
  devGenerator.setXfce();
  devGenerator.setDeno();
  devGenerator.setDotnet("6");
  devGenerator.updateGit(true);
  devGenerator.setZsh();
  devGenerator.setDocker();
  devGenerator.setVscode();
  devGenerator.setRemoteDesktop("noVNC");
  devGenerator.setChrome();

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`./Dockerfile`, Dockerfile);

  await writeFile(`./README.md`, README);
};

run();
