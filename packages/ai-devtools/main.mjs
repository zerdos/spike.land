import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import OpenAI from "openai";
import pLimit from "p-limit";
import process from "process";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in environment variables.");
  process.exit(1);
}

export const openai = new OpenAI(
  {
    organization: "org-iMeNwBXOvbwVSfnaOb89U7gt",
    project: "proj_GfNHjREIhyw39p4t5ZI7udlO",
    apiKey: process.env.OPENAI_API_KEY});

const app = express();
app.use(bodyParser.text());

app.post("/commit", (req, resp) => handleTLDRRequest(req, resp, "commit"));

app.post("/tldr", handleTLDRRequest);

app.get("/*", async (req, resp) => {
  console.log(req.originalUrl);

  const url = req.originalUrl.startsWith("/patch-diff.gith")
    ? "https://" + req.originalUrl.slice(1)
    : "https://" + req.originalUrl.slice(1) + ".diff";
  console.log({ url });

  const diff = await (await fetch(url)).text();

  return handleTLDRRequest({ ...req, body: diff }, resp);
});

const cache = {};

app.use(handleErrors);

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});

async function handleTLDRRequest(req, res, type = "tldr") {
  if (typeof req.body !== "string") {
    res.status(400).json({ error: "Invalid input format. Expected a string." });
    return;
  }

  const diff = req.body;
  const sections = diff.split("diff --git");

  const limit = pLimit(3);
  const tasks = sections.map((section) => {
    if (section.trim() === "") return Promise.resolve("");
    return limit(() =>
      generateSummary(section, "gpt-4o-mini").then((x) => {
        console.log(x);
        return x;
      })
    );
  });

  const summariesFull = await Promise.allSettled(tasks);
  const successfulSummaries = summariesFull.filter((result) => result.status === "fulfilled").map((result) =>
    result.value
  )
    .filter((x) => x);

  try {
    const sumOfSums = [];
    if (successfulSummaries.length > 4) {
      while (successfulSummaries.length) {
        sumOfSums.push(
          generateSummary(successfulSummaries.splice(0, 4).join(` --- `)),
        );
      }
    } else sumOfSums.push(...successfulSummaries);

    const summaries = (await Promise.allSettled(sumOfSums)).filter((result) => result.status === "fulfilled").map(
      (result) => result.value,
    ).filter((x) => x);

    const prompt = type === "tldr"
      ? `
  If you find any issue, you have the developers to double check things just for making sure that everything is correct, please not even write a summary about the features.
  In case of issue, typo, error, your message starts:
  "ACTIONS NEEDED!!!" 
  Otherwise, if there are no issues: Your job is summarizing the reviews in a short, but effective message.
  
  ${
        summaries.join(`
  
  ----agent-report:
  `)
      }
  
  `
      : `
  You are an expert software developer, and you know how to write short and expressing commit messages - in convictional commit format. 
  The repo has the following changes:   ${summaries.join(`\n`)}
  Please try hard to write the best commit message possible!
  `;

    if (cache[prompt]) return res.json(cache[prompt]);

    console.log(prompt);
    const finalSummary = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: prompt,
      }],
    }).catch(async () =>
      console.log("Failed to generate final summary. Trying with gpt-4o.")
    );
    cache[prompt] = finalSummary.data.choices[0].message.content;

    res.json(cache[prompt]);
  } catch (e) {
    res.status(500).json({ error: "Failed to generate final summary." });
  }
}

function handleErrors(err, req, res, next) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}

async function generateSummary(diffSection, model = "gpt-4o-mini") {
  if (cache[diffSection]) return cache[diffSection];

  const prompt = `GIT diff TLDR! (typo, error, etc)  ${diffSection.slice(0, 2028)}.`;

  try {
    const completion = openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 800,
    });
    cache[diffSection] = completion.data.choices[0].message.content;
    return cache[diffSection];
  } catch (e) {
    console.error(
      `Failed to generate summary with model ${model}: ${e.message}`,
    );
  }
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
