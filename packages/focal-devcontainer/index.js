const { DevcontainerGenerator } = require("@devcontainer/generator");
const { writeFile } = require("fs").promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("ubuntu:focal");

  devGenerator.setNodeVersion("lts");
  devGenerator.setXfce();
  devGenerator.setDeno();
  devGenerator.updateGit();
  devGenerator.setZsh();
  devGenerator.setDocker();
  devGenerator.setCypress();
  devGenerator.setRemoteDesktop("noVNC");
  devGenerator.setChrome();

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`${__dirname}/Dockerfile`, Dockerfile);

  await writeFile(`${__dirname}/README.md`, README);
};

run();
