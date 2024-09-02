
const express = require('express');
const path = require('path');
const { HfInference } = require("@huggingface/inference");

const hf = new HfInference("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");

const app = express();
const PORT = 3000;
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

// send back files to the frontend
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
})

app.post('/', async (req, res) => {
  try {
    const result = await hf.textGeneration({
      model: "mistralai/Mistral-7B-Instruct-v0.2",
      inputs: `Generate a poem title and poem based off these prompts:${req.body.prompt}`,
    });

    // Extract title and poem from result.generated_text
      var titleStartIndex = result.generated_text.indexOf("Title:");
  // Extract the substring after "Title:"
  var titleSubstring = result.generated_text.substring(titleStartIndex);
  // Find the position of the first newline character after "Title:"
  var titleEndIndex = titleSubstring.indexOf("\n");
  // Extract the title
  var generatedTitle = titleSubstring
    .substring("Title:".length, titleEndIndex)
    .trim();
  var poemStartIndex = result.generated_text.indexOf("\n", titleStartIndex);
  var generatedPoem = result.generated_text.substring(poemStartIndex).trim();

    // Send response with title and poem
    res.json({
      title: generatedTitle,
      poem: generatedPoem
    });
  } catch (error) {
    console.error('Error generating poem:', error);
    res.status(500).json({ error: 'An error occurred while generating the poem' });
  }
});



app.listen(PORT, () => {
  console.log('listening on port: ' + PORT);
})



// async function generatePoem() {
//   const answer = await hf.textGeneration({
//     model: "mistralai/Mistral-7B-Instruct-v0.2",
//     // inputs:
//     //   "Generate a poem title and poem based off these prompts: daily efforts will compound",
//     inputs: `Generate a poem title and poem based off these prompts:${userText}`,
//   });

//   var titleStartIndex = answer.generated_text.indexOf("Title:");
//   // Extract the substring after "Title:"
//   var titleSubstring = answer.generated_text.substring(titleStartIndex);
//   // Find the position of the first newline character after "Title:"
//   var titleEndIndex = titleSubstring.indexOf("\n");
//   // Extract the title
//   var generatedTitle = titleSubstring.substring("Title:".length, titleEndIndex).trim();
//   var poemStartIndex = answer.generated_text.indexOf("\n", titleStartIndex);
//   var generatedPoem = answer.generated_text.substring(poemStartIndex).trim();
//   // console.log(title) 
//   // console.log(poem);

//   title.innerHTML = `<h2>${generatedTitle}</h2>`;
//   poem.innerHTML = `<p>${generatedPoem}</p>`;
// }

// generatePoem();

