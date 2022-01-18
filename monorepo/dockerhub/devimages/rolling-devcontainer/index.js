const { DevcontainerGenerator } = require("@spike.land/devcontainer-generator");
const { writeFile } = require("fs").promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("rolling");

  devGenerator.setNodeVersion("current");
  devGenerator.setXfce();
  devGenerator.setDeno();
  devGenerator.setZsh();
  devGenerator.setRemoteDesktop("noVNC");

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`${__dirname}/Dockerfile`, Dockerfile);

  await writeFile(`${__dirname}/README.md`, README);
};

run();
