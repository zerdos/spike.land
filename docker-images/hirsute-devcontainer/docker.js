const p = require(__dirname + `/package.json`);
const execa = require("execa");

const tagname = `devimages/${p.tagname}:${p.version}`;
const latestTagname = `devimages/${p.tagname}:latest`;

(async () => {
  const dockerBuild = execa("docker", [
    "build",
    ".",
    "-t",
    tagname,
    "-t",
    latestTagname
  ]);

  dockerBuild && dockerBuild.stdout &&
    dockerBuild.stdout.pipe(process.stdout) && dockerBuild.stderr &&
    dockerBuild.stderr.pipe(process.stderr);
  await dockerBuild;

  const dockerPush = execa("docker", ["push", tagname]);

  dockerPush && dockerPush.stdout && dockerPush.stdout.pipe(process.stdout) &&
    dockerPush.stderr && dockerPush.stderr.pipe(process.stderr);

  await execa("docker", ["push", latestTagname]);
  await dockerPush;
})();
