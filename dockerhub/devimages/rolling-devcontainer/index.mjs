import { DevcontainerGenerator } from "@spike.land/devcontainer-generator";
import { promises } from "fs";
const { writeFile } = promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("rolling");

  devGenerator.setNodeVersion("lts");
  devGenerator.setXfce();
  devGenerator.setDeno();
  devGenerator.setZsh();
  devGenerator.setChrome();
  devGenerator.setRemoteDesktop("noVNC");

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`./Dockerfile`, Dockerfile);

  await writeFile(`./README.md`, README);
};

run();
