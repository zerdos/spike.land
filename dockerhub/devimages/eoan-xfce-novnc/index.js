const { DevcontainerGenerator } = require("@devcontainer/generator");
const { writeFile } = require("fs").promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator("focal"); // I know its not eoan - but eoan is not supported anymore

  devGenerator.setXfce();
  devGenerator.setRemoteDesktop("noVNC");
  devGenerator.setChrome();
  devGenerator.setNodeVersion("lts");

  const { Dockerfile, README } = await devGenerator.generate();

  await writeFile(`${__dirname}/Dockerfile`, Dockerfile);

  await writeFile(`${__dirname}/README.md`, README);
};

run();
