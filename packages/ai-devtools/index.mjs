#!/usr/bin/env node

import { exec } from "child_process";
import { Command } from "commander";
import fetch from "node-fetch";
import process from "process";
import { promisify } from "util";
import "./main.mjs";
const program = new Command();

const exe = promisify(exec);

program
  .version("1.0.0")
  .description("CLI tool to execute a special git commit command")
  .action(async () => {
    exec("git diff --cached", async (error, stdout, stderr) => {
      let diff = stdout;
      if (diff.length === 0) {
        await exe("git add .");
        diff = (await exe("git diff --cached")).stdout;

        if (diff.length === 0) {
          await exe("git reset --soft HEAD~");
          diff = (await exe("git diff --cached")).stdout;
        }
      }

      if (error) {
        console.error(`exec error: ${error}`);
        return;
      }

      let response;
      try {
        response = await fetch(
          "http://localhost:3000/commit",
          {
            method: "POST",
            headers: {
              "Content-Type": "text/plain",
            },
            body: stdout,
          },
        );
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
