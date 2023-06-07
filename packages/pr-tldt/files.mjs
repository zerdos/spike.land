import { Configuration, OpenAIApi } from "openai";
import simpleGit from "simple-git";

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

// Initialize simple-git

const options = {
  baseDir: ".",
  binary: "git",
  maxConcurrentProcesses: 6,
  trimmed: false,
};

const git = simpleGit(options);

// Get a list of changed files
let commitMessage = "";

git.diff(["--cached", "--name-only"])
  .then(async (result) => {
    // console.log({result});
    const changedFiles = result.split("\n");

    // Generate a commit message
    await Promise.all(changedFiles.map(file =>
      file && git.diff(["--cached", "--", file])
        .then(result => {
          const changes = result;
          // console.log({result})

          const empty = { data: { choices: [{ text: "" }] } };
          if (file.indexOf("yarn.lock") !== -1) return empty;
          if (file.indexOf(".pnp.cjs") !== -1) return empty;
          if (file.indexOf("package-lock") !== -1) return empty;

          // Generate a summary of the changes
          return openai.createCompletion({
            model: "text-davinci-003",
            prompt: "TLDR? " + changes.slice(0, 2048) + "     TLDR?",
            max_tokens: 400,
          });
        })
        .then(response => {
          // console.log({response})
          const summary = response.data.choices[0].text;

          // Add the summary to the commit message
          if (summary) {
            commitMessage = `${file}: ${summary}\n`;
          }

          // Set the commit message
          console.log(commitMessage);
          // return git.commit();
          return commitMessage;
        })
        .catch((err) => {
          console.error(err.message || "err2");
        })
    ));
  })
  .catch(err => {
    console.error("err3");
  });
