let form_container = document.querySelector('.form-container');
let user_input = document.getElementById('prompt');

let poem_container = document.querySelector('.poem-container');
let poem_prompt = document.querySelector('.prompt');
let poem_title = document.querySelector('.title');
let new_poem = document.querySelector(".poem");

//buttons
// let submit_btn = document.querySelector(".submit");
// let regen_poem = document.querySelector(".regen-poem");
// let new_poem = document.querySelector('.new-poem');



import { HfInference } from "@huggingface/inference";
const hf = new HfInference("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");

// let poems = {
//   'love': 'love is patient, love is kind, love doesnt boast',
//   'golden rule': 'stay postive, theres always a way;',
//   'poem 1': 'ekjfekjfkejekjr',
//   'poem 2': 'knfkndkfnkdfnkd',
//   'poem 4': 'shjfhsjfhjshdj',
//   'poem 5': 'dkfjdkfjdkfjkdjf'
// }

// async function create_poem() {
//   var poemTitles = Object.keys(poems);
//   var randomIndex = Math.floor(Math.random() * poemTitles.length);

//   var randomTitle = poemTitles[randomIndex];
//   var randomPoem = poems[randomTitle];
//   title.innerHTML = `<h2>${randomTitle}</h2>`;
//   poem.innerHTML = `<p>${randomPoem}</p>`;

//   const responseText = await fetchResponse();
//   console.log(responseText);
//   title.innerHTML = `<h2>${responseText.title}</h2>`;
//   poem.innerHTML = `<p>${responseText.poem}</p>`;
// }


//  function submit_prompt() {
//   form_container.addEventListener("submit", (event) => {
//     event.preventDefault();
//     form_container.style.display = "none";
//     poem_container.style.display = "flex";
//     console.log(user_input.value);

//     poem_prompt.innerHTML = `<p>Poem Prompt: ${user_input.value}</p>`;
//     create_poem()

//   });
// }


async function fetchResponse() {

  const response = await fetch("/", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ text: user_input.value }),
  });

  const responseData = await response.json();
  console.log(responseData)
  return responseData.response;
  
}

function submit_prompt() {
   
     async function handleSubmit(event) {
        event.preventDefault();
        form_container.style.display = "none";
        poem_container.style.display = "flex";
        console.log(user_input.value);
        poem_prompt.innerHTML = `<p>Poem Prompt: ${user_input.value}</p>`;
        const responseText = await fetchResponse()
        console.log(responseText);
        // poem_title.innerHTML = `<h2>${responseText.title}</h2>`;
        new_poem.innerHTML = `<p>${responseText.poem}</p>`;
       
  };
  
  form_container.addEventListener("submit",handleSubmit);
 }


// function regenerate_poem() {
//   regen_poem.addEventListener("click", create_poem)
// }

// function restart(){
//   new_poem.addEventListener("click", e => {
//     form_container.reset()
//     user_input.value = '';
//     if (form_container.style.display === "none"){
//       form_container.style.display = "flex";
//       poem_container.style.display = "none";
//     }
//   })
// }

submit_prompt()
// regenerate_poem()
// restart()