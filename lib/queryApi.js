// import openai from "./chatGpt";
// const query = async (prompt) =>{
//     const res = await openai.createChatCompletion({
//         model:'gpt-3.5-turbo',
//         prompt,
//         temperature:0.9,
//         top_p:1,
//         max_tokens:1000,
//         frequency_penalty:0,
//         presence_penalty:0
//     })
//     .then((res) => {
//        return res.data.choices[0].message.content
//         console.log(res)
//     })
//     .catch((err) => 
//         `Chatgpt could not find an answer for that!! (Error:${err.message})`)
//         // console.log(res)
//         return res;
// }

// export default query;


const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(configuration);

const query = async (prompt) => {
  try {
    const res = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: 'You are a helpful assistant.' },
        { role: 'user', content: prompt },
      ],
      temperature: 0.9,
      max_tokens: 50,
      n: 1,
      stop: ['\n'],                             
    });

    return res.data.choices[0].message.content;
  } catch (err) {
    console.error("ChatGPT encountered an error:", err.response.data);
    return "ChatGPT could not find an answer for that!";
  }
};

module.exports = query;
