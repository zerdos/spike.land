#!/usr/bin/env zx

await $`cat package.json | grep name`;

const branch = await $`git branch --show-current`;
// await $`dep deploy --branch=${branch}`

const dirs = await $`ls`;

console.log(dirs.stdout.explode());

console.log(branch);

await Promise.all([
  $`sleep 1; echo 1`,
  $`sleep 2; echo 2`,
  $`sleep 3; echo 3`,
]);

const name = "foo bar";
await $`mkdir -p /tmp/${name}`;
