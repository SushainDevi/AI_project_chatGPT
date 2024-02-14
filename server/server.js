import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import openai from 'openai';

dotenv.config();

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  console.error('OPENAI_API_KEY is missing. Please check your .env file.');
  process.exit(1);
}

const app = express();
app.use(cors());
app.use(express.json());

const openaiClient = new openai({ apiKey }); // Initialize OpenAI with the API key

app.get('/', async (req, res) => {
  res.status(200).send({
    message: 'HI its Veronica..!'
  });
});

app.post('/', async (req, res) => {
  try {
    const prompt = req.body.prompt;

    const response = await openaiClient.createCompletion({
      model: "text-davinci-003",
      prompt: `${prompt}`,
      temperature: 0,
      max_tokens: 3000,
      top_p: 1,
      frequency_penalty: 0.5,
      presence_penalty: 0,
    });

    res.status(200).send({
      bot: response.data.choices[0].text
    });

  } catch (error) {
    console.error(error);
    res.status(500).send(error || 'Something went wrong');
  }
});

const port = process.env.PORT || 5000;
app.listen(port, () => console.log(`AI server started on http://localhost:${port}`));
