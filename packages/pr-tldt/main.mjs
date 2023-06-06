import express from 'express';
import bodyParser from 'body-parser';
import { Configuration, OpenAIApi } from 'openai';
import pLimit from 'p-limit';




const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const app = express();
app.use(bodyParser.text());

app.post('/tldr', async (req, res) => {
    const diff = req.body;
    const sections = diff.split('diff --git');

    const limit = pLimit(4);
    const tasks = sections.map(section => {
        if (section.trim() === '') return Promise.resolve('');
        return limit(() => generateSummary(section));
    });

    const summariesFull = await Promise.allSettled(tasks);
    const successfulSummaries = summariesFull.filter(result => result.status === 'fulfilled').map(result => result.value);

    res.json(await generateSummary(successfulSummaries.join('\n')));
});

async function generateSummary(diffSection, model='gpt-3.5-turbo') {
    const prompt = `Git diff:\n${diffSection.slice(0, 2028)}\nTL;DR:`;
    console.log(prompt);

    try {
        const completion = await openai.createChatCompletion({
            model,
            messages: [{role: 'user', content: prompt}],
        });
        return completion.data.choices[0].message.content;
    } catch(e) {
        console.error(`Failed to generate summary with model ${model}: ${e.message}`);
        if (model !== 'gpt-3.5-turbo') {
            return generateSummary(diffSection, 'gpt-3.5-turbo');
        } else {
            return 'Sorry, I could not understand that.';
        }
    }
}

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
