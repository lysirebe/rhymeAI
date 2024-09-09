let form_container = document.querySelector('.form-container');
let user_input = document.getElementById('prompt');

let poem_container = document.querySelector('.poem-container');
let poem_prompt = document.querySelector('.prompt');
let poem_title = document.querySelector('.title');
let new_poem = document.querySelector(".poem");

let savedPoems = [];

//buttons
// let submit_btn = document.querySelector(".submit");
// let regen_poem = document.querySelector(".regen-poem");
// let new_poem = document.querySelector('.new-poem');

import { HfInference } from "@huggingface/inference";
const hf = new HfInference("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");

// history section save poems generated in local storage. display the title name of the poems and the first line with ... then have it say click to view.

async function fetchResponse() {
  try {
    const response = await fetch("/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ prompt: user_input.value }),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const responseData = await response.json();
    console.log(responseData);
    return responseData;
  } catch (error) {
    console.error('Error during fetch:', error);
    return null;
  }
}



function savePoem(prompt, responseText){
  let savedPoem = {
    prompt:prompt, 
    poemObject:responseText
  }
  savedPoems.push(savedPoem);
  localStorage.setItem('savedPoems',JSON.stringify(savedPoems));
  let myObj = JSON.parse(localStorage.getItem('savedPoems'))
  console.log(myObj);

}


function displayPoem(prompt, responseText) {
poem_prompt.innerHTML = `<p>Poem Prompt: ${prompt}</p>`;
poem_title.innerHTML = `<h2>${responseText.title}</h2>`;
new_poem.innerHTML = `<pre>${responseText.poem}</pre>`;
}

function submit_prompt() {
async function handleSubmit(event) {
event.preventDefault();
form_container.style.display = "none";
poem_container.style.display = "flex";

const prompt = user_input.value;
const responseText = await fetchResponse(prompt);

if (responseText) {
  displayPoem(prompt, responseText);
  savePoem(prompt, responseText);

}
}

form_container.addEventListener("submit", handleSubmit);
}
