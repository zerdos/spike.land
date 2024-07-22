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
    apiKey: process.env.OPENAI_API_KEY,
  },
);

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

async function handleTLDRRequest(req, res) {
  if (typeof req.body !== "string") {
    res.status(400).json({ error: "Invalid input format. Expected a string." });
    return;
  }

  const diff = req.body;
  const sections = diff.split("diff --git");

  console.log({ sections });

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

    const prompt = `Please create a git conventional commit from this changes:  ${summaries.join(`\n`)}

Your answer should be a short, but effective commit message. Just the commit message, no need for the commit body or footer.
In one line, no line breaks or "' characters. For example: fix: typo in the README.md file
for example: fix: typo in the README.md file
chore: update the package.json file
feat: add a new feature


`;

    if (cache[prompt]) return res.json(cache[prompt]);

    console.log(prompt);
    const finalSummary = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{
        role: "user",
        content: prompt,
      }],
    }).catch(async () => console.log("Failed to generate final summary. Trying with gpt-4o."));
    if (!finalSummary) {
      return res.status(500).json({ error: "Failed to generate final summary." });
    }
    cache[prompt] = finalSummary.choices[0].message.content;

    res.json(cache[prompt]);
  } catch (e) {
    res.status(500).json({ error: "Failed to generate final summary." });
  }
}

function handleErrors(err, req, res) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
}

async function generateSummary(diffSection, model = "gpt-4o-mini") {
  if (cache[diffSection]) return cache[diffSection];

  const prompt = `Hey! Please create a git conventional commit from this changes:  ${diffSection.slice(0, 10000)}.
  
  Your answer should be a short, but effective commit message.`;

  try {
    const completion = await openai.chat.completions.create({
      model,
      messages: [{ role: "user", content: prompt }],
    });
    cache[diffSection] = completion.choices[0].message.content;
    return cache[diffSection];
  } catch (e) {
    console.error(
      `Failed to generate summary with model ${model}: ${e.message}`,
    );
  }
}

app.use((err, req, res) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});
