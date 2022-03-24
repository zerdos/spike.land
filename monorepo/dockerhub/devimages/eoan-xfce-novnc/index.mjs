import { DevcontainerGenerator } from "@spike.land/devcontainer-generator";
import { promises } from "fs";
const { writeFile } = promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("focal"); // I know its not eoan - but eoan is not supported anymore

  devGenerator.setXfce();
  devGenerator.setRemoteDesktop("noVNC");
  devGenerator.setChrome();
  devGenerator.setNodeVersion("lts");

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`./Dockerfile`, Dockerfile);

  await writeFile(`./README.md`, README);
};

run();
