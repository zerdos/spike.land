const {DevcontainerGenerator} = require('@devcontainer/generator');
const {writeFile} = require('fs').promises;

const run = async () => {
  const devGenerator = new DevcontainerGenerator('eoan');

  devGenerator.setNodeVersion('current');
  devGenerator.updateGit();
  devGenerator.setDotnet('3'),
  devGenerator.setDocker();
  devGenerator.setXfce();
  devGenerator.setVscode();
  devGenerator.setCypress();
  devGenerator.setRemoteDesktop('noVNC');
  devGenerator.setChrome();
  devGenerator.setZsh();

  const {
    Dockerfile,
    README,
  } = await devGenerator.generate();

  await writeFile(
      `${__dirname}/Dockerfile`, Dockerfile,
  );

  await writeFile(`${__dirname}/README.md`, README);
};

run();
