// const axios = require('axios');
const express = require('express');
const bodyParser = require('body-parser');



const { Configuration, OpenAIApi } = require("openai")

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);





const app = express();

const openAIKey = process.env.OPENAI_API_KEY; // replace with your OpenAI key

app.use(bodyParser.text());

app.post('/tldr', async (req, res) => {
    const diff = req.body;

    // Break diff into sections.
    // This is a simple example and might not work for every diff.
    // You might want to use a dedicated library or write custom code to parse the diff.
    const sections = diff.split('diff --git');

    // For each section, generate a TL;DR using GPT-4.
    let summaries = [];
    for (let section of sections) {
        if (section.trim() === '') continue;

        const summary = generateSummary(section);
        summaries.push(summary);
    }

    const summariesFull = await Promise.all(summaries);

    // Send the aggregate summaries back to the client.
    res.json( await generateSummary(summariesFull, "gpt-4").catch(()=>generateSummary(summariesFull)));
});

async function generateSummary(diffSection, model="gpt-3.5-turbo") {
    console.log(diffSection);
    const prompt = `Git diff:\n${diffSection.slice(0, 2028)}\nTL;DR:`;


    try{
    const completion = await openai.createChatCompletion({
        model,
        messages: [{role: "user", content: prompt}],
      });

      console.log(completion.data.choices[0].message.content)

      return completion.data.choices[0].message.content
      
    }catch(e){
            await sleep(1000);

            function sleep(ms) {
                return new Promise((resolve) => {
                  setTimeout(resolve, ms);
                });
              }

              try{

              const completion2 = await openai.createChatCompletion({
                model: "gpt-3.5-turbo",
                messages: [{role: "user", content: prompt}],
              })

              console.log(completion2.data.choices[0].message.content)
              return completion2.data.choices[0].message.content;
            } catch (e) 
            {
                return e.message || "Sorry, I couldn't understand that."
            }

    }


}

const port = 3000;
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});


