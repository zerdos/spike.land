#!/usr/bin/env node

import { exec } from "child_process";
import { Command } from "commander";
import fetch from "node-fetch";
const program = new Command();

program
  .version("1.0.0")
  .description("CLI tool to execute a special git commit command")
  .action(async () => {
    exec("git diff --cached", async (error, stdout, stderr) => {
      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      let response;
      try {
        response = await fetch("https://git-diff-tldt-ozv5gnkbfa-uc.a.run.app/commit", {
          method: "POST",
          headers: {
            "Content-Type": "text/plain",
          },
          body: stdout,
        });
      } catch (error) {
        console.error(`fetch error: ${error}`);
        return;
      }

      const body = await response.text();

      exec(`git commit -m "${body.slice(1, -1)}"`, (error, stdout, stderr) => {
        if (error) {
          console.error(`exec error: ${error}`);
          return;
        }

        console.log(`Commit message: ${body}`);
      });
    });
  });

program.parse(process.argv);
