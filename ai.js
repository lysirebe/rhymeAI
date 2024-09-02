import { config } from "dotenv";
config();
// console.log(process.env);
// import { OpenAI } from "openai";

// const openai = new OpenAI({
//   apiKey: "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",
// });

// const generatePoem = async (user_input) => {
//   const completion = await openai.chat.completions.create({
//     messages: [
//       {
//         role: "system",
//         content:
//           "You are a kind loving father who is wise like King solomon and deep-thinking like King David from the bible",
//       },
//       { role: "user", content: user_input },
//     ],
//     model: "gpt-3.5-turbo",
//   });

//   console.log(completion.choices[0]);
// };
// generatePoem(
//   "write a rhyming poem using kind soothing words that serves as a reminder before going to bed"
// );


import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const response = await openai.chat.completions.create({
  model: "gpt-3.5-turbo",
  messages: [
    {
      role: "system",
      content:
        ' "You are a kind loving father who is wise like King solomon and deep-thinking like King David from the bible"',
    },
    {
      role: "user",
      content:
        "write a rhyming poem using kind soothing words that serves as a reminder before going to bed",
    },
  ],
  temperature: 1,
  max_tokens: 256,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
});

response()