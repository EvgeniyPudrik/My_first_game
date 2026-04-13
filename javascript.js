let inputQuestion = document.getElementById("question");
let inputAnswer = document.getElementById("text");
let button = document.getElementById("button");
let result = document.getElementById("result");

let questionsArray = [
  {word: "бобер",
    question: "Хто будує будинок із гілок на річці?"},
  {word: "море",
    question: "Як називається велика солона вода?"},
  {word: "годинник",
    question: "Що має стрілки, але не стріляє?"},
  {word: "гребінець",
    question: "Що має зуби, але не кусає?"},
  {word: "обіцянка",
    question: "Що можна зламати, навіть не торкаючись?"},
  {word: "бурулька",
    question: "Що росте вниз?"},
  {word: "сон",
    question: "Що можна побачити із заплющеними очима?"},
  {word: "звук",
    question: "Що можна почути, але не побачити?"}
];
let randomIndex = Math.floor(Math.random() * questionsArray.length);
let word = questionsArray[randomIndex].word;
let question = questionsArray[randomIndex].question;

let answerInput = [];

for (let i = 0; i < word.length; i++) {
  answerInput[i] = "_";
  inputQuestion.innerHTML = `Ось твоє запитання:
    ${question}`;
  result.innerHTML = answerInput.join(" ");
}

let lettersLeft = word.length;
let trysLeft = word.length + 2;

button.addEventListener("click", function () {
  let letter = inputAnswer.value.toLowerCase();

  // перевірка: 1 буква
  if (letter.length !== 1) {
    alert("Введи ОДНУ букву!");
    return;
  }

  let found = false;

  for (let j = 0; j < word.length; j++) {
    if (word[j] === letter && answerInput[j] === "_") {
      answerInput[j] = letter;
      lettersLeft--;
      found = true;
    }
  }

  if (found) {
    alert(`Молодець! Є така буква 😎`);
  } else {
    trysLeft--;
    alert(`Немає такої букви 😢 Спроб залишилось: ${trysLeft}`);
  }

  // оновлюємо відображення
  result.innerHTML = answerInput.join(" ");

  // очищаємо input
  inputAnswer.value = "";

  // перевірка перемоги
  if (lettersLeft === 0) {
    alert("🎉 Ти виграла!");
  }

  // перевірка програшу
  if (trysLeft === 0) {
    alert(`😢 Ти програв! Слово було: ${word}`);
  }
});
