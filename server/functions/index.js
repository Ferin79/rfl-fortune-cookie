const { Configuration, OpenAIApi } = require('openai');
require('dotenv').config();
const { onRequest } = require('firebase-functions/v2/https');
const admin = require('firebase-admin');
const Validator = require('validatorjs');
const cors = require('cors')({ origin: true });

admin.initializeApp();
const configuration = new Configuration({
  organization: 'org-5wzMlnzVL7GPnrbx00KQiDmP',
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rules = {
  name: 'required',
  email: 'required|email',
};

function generateMessage(name, goal, obstacle, emotion) {
  let message = `Write a motivation message under 50-75 words for person whose name is "${name}". `;

  if (goal.length) {
    message += `The biggest goal or aspiration right now for ${name} is ${goal.join(
      ', '
    )}. `;
  }
  if (obstacle.length) {
    message += `${obstacle.join(
      ', '
    )} are the challenges or obstacles ${name} is currently facing. `;
  }

  if (emotion.length) {
    message += `${name} found ${emotion.join(
      ', '
    )} most uplifting when seeking motivation. `;
  }

  message +=
    'Use easy to understand words and write in a second person. Always uses first name in response.';

  return message;
}

exports.fortunecookie = onRequest(async (request, response) => {
  await cors(request, response, async () => {
    const requestData = request.body;
    const validation = new Validator(requestData, rules);

    if (validation.fails()) {
      return response.status(400).send(validation.errors.all());
    }

    try {
      const aiResponse = await openai.createChatCompletion({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'user',
            content: generateMessage(
              requestData.name,
              requestData.goal || [],
              requestData.obstacle || [],
              requestData.emotion || []
            ),
          },
        ],
      });

      const gptResponse = aiResponse.data?.choices[0]?.message?.content || '';

      const fsResponse = await admin
        .firestore()
        .collection('fortune-cookie')
        .where('email', '==', requestData.email)
        .get();

      if (fsResponse.size) {
        return response.status(200).json({
          message: gptResponse,
          recordStatus: 'found',
        });
      } else {
        await admin
          .firestore()
          .collection('fortune-cookie')
          .add({ ...requestData, message: gptResponse });
      }
      return response.status(200).json({
        message: gptResponse,
        recordStatus: 'created',
      });
    } catch (error) {
      return response.status(500).json({
        message: error.message,
      });
    }
  });
});
