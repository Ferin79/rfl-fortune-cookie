const { Configuration, OpenAIApi } = require("openai");
require("dotenv").config()
const { onRequest } = require("firebase-functions/v2/https");
const admin = require('firebase-admin');
const Validator = require('validatorjs');
const cors = require('cors')({ origin: true });


admin.initializeApp();
const configuration = new Configuration({
  organization: "org-5wzMlnzVL7GPnrbx00KQiDmP",
  apiKey: process.env.OPENAI_API_KEY,
});
const openai = new OpenAIApi(configuration);

const rules = {
  name: 'required',
  email: 'required|email',
  goal: 'required',
  obstacle: 'required',
  emotion: 'required'
};

exports.generateFortuneCookie = onRequest(async (request, response) => {
  await cors(request, response, async () => {
    const requestData = request.body;
    const validation = new Validator(requestData, rules);

    if (validation.fails()) {
      return response.status(400).send(
        validation.errors.all()
      )
    }
    const gptRequest = `Write a fortune cookie under 50 words for person named "${requestData.name}" whose biggest goal or aspiration is ${requestData.goal}, 
  whose challenges or obstacles are ${requestData.obstacle} and whose most uplifting emotion 
  is when seeking motivation is ${requestData.emotion}. use easy-to-understand words. Write in a second person. Always use name. `

    try {
      const aiResponse = await openai.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages: [{ role: "user", content: gptRequest }]
      })

      const gptResponse = aiResponse.data?.choices[0]?.message?.content || ""

      const fsResponse = await admin.firestore().collection('fortune-cookie')
        .where('email', '==', requestData.email)
        .get()

      if (fsResponse.size) {
        return response.status(200).json({
          message: gptResponse,
          recordStatus: "found"
        })
      }
      await admin.firestore().collection('fortune-cookie')
        .add({ ...requestData, fortuneMessage: gptResponse })
      return response.status(200).json({
        message: gptResponse,
        recordStatus: "created"
      })
    } catch (error) {
      return response.status(500).json({
        message: error.message
      })
    }
  })

})