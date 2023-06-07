import bodyParser from "body-parser";
import dotenv from "dotenv";
import express from "express";
import { Configuration, OpenAIApi } from "openai";
import pLimit from "p-limit";

dotenv.config();

if (!process.env.OPENAI_API_KEY) {
  console.error("Missing OPENAI_API_KEY in environment variables.");
  process.exit(1);
}

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.text());

app.post("/tldr", async (req, res) => {
  if (typeof req.body !== "string") {
    res.status(400).json({ error: "Invalid input format. Expected a string." });
    return;
  }

  const diff = req.body;
  const sections = diff.split("diff --git");

  const limit = pLimit(4);
  const tasks = sections.map(section => {
    if (section.trim() === "") return Promise.resolve("");
    return limit(() => generateSummary(section, "gpt-3.5-turbo"));
  });

  const summariesFull = await Promise.allSettled(tasks);
  const successfulSummaries = summariesFull.filter(result => result.status === "fulfilled").map(result =>
    result.value.trim()
  ).filter(x => x);

  try {
    const promt = `
If you find any issue, you have the developers to double check things just for making sure that everything is correct, please not even write a summary about the features.
Otherwise, if there are no issues: Your job is summarizing the reviews in a short, but effective summary message.

----agent-report:

${
      successfulSummaries.join(`

----agent-report:
`)
    }

`;

    console.log(promt);
    const finalSummary = await openai.createChatCompletion({
      model: "gpt-4",
      messages: [{
        role: "user",
        content: promt,
      }],
      max_tokens: 3600,
    });

    res.json(finalSummary.data.choices[0].message.content);
  } catch (e) {
    res.status(500).json({ error: "Failed to generate final summary." });
  }
});

async function generateSummary(diffSection, model = "gpt-3.5-turbo") {
  const prompt = `GIT diff TLDR! (typo, error, etc)  ${diffSection.slice(0, 2028)}.`;

  try {
    const completion = await openai.createChatCompletion({
      model,
      messages: [{ role: "user", content: prompt }],
      max_tokens: 400,
    });
    return completion.data.choices[0].message.content;
  } catch (e) {
    console.error(`Failed to generate summary with model ${model}: ${e.message}`);
    if (model !== "gpt-3.5-turbo") {
      return generateSummary(diffSection, "gpt-3.5-turbo");
    } else {
      throw e;
    }
  }
}

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
