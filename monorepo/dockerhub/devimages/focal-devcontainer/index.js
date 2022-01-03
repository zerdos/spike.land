const { DevcontainerGenerator } = require("@spike.land/devcontainer-generator");
const { writeFile } = require("fs").promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("focal");

  devGenerator.setNodeVersion("current");
  devGenerator.setXfce();
  devGenerator.setZsh();
  devGenerator.setRemoteDesktop("noVNC");
  devGenerator.setChrome();
  devGenerator.setVscode();

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`${__dirname}/Dockerfile`, Dockerfile);

  await writeFile(`${__dirname}/README.md`, README);
};

run();
