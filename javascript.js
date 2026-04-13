questionSection = document.getElementById("question");
let textInput = document.getElementById("text");
let button = document.getElementById("button");
let result = document.getElementById("result");
let lives = document.getElementById("lives");
let timerElement = document.getElementById("timer");
let startButton = document.getElementById("startGame");

let winSound = document.getElementById("winnSound");
let mainSound = document.getElementById("mainSound");
let buttonSound = document.getElementById("buttonSound");
let loseSound = document.getElementById("loseSound");
let wrongLetter = document.getElementById("wrongLetter");
let congratulation = document.getElementById("congratulation");

let wordsArray = [
  { word: "земля", question: "Як називається планета, на якій ми живемо?" },
  {word: "меркурій", question: "Як називається найближча до Сонця планета?"},
  {word: "телескоп", question: "Як називається прилад для збільшення далеких об’єктів у космосі?"},
  {word: "зоологія", question: "Як називається наука про тварин?"},
  {word: "парне", question: "Як називається число, яке ділиться на 2 без остачі?"},
  {word: "сума", question: "Як називається результат додавання?"},
  {word: "добуток", question: "Як називається результат множення?"},
  {word: "квадрат", question: "Як називається фігура з чотирма рівними сторонами?"},
  {word: "", question: "Як називається фігура без кутів?"},
  {word: "коло", question: "Як називається фігура без кутів?"},
  {word: "лід", question: "Як називається стан води при температурі нижче нуля?"},
  {word: "кисень", question: "Як називається газ, яким ми дихаємо?"},
  {word: "сонце", question: "Як називається центр Сонячної системи?"},
  {word: "місяць", question: "Як називається супутник Землі?"},
  {word: "астронавт", question: "Як називається людина, яка досліджує космос?"},
  {word: "термометр", question: "Як називається прилад для вимірювання температури?"},
  {word: "бібліотека", question: "Як називається місце, де зберігають книги?"},
  {word: "сахара", question: "Як називається велика пустеля в Африці?"},
  {word: "тихий", question: "Як називається найбільший океан?"},
  {word: "очі", question: "Як називається частина тіла, якою ми бачимо?"},
  {word: "ветеринар", question: "Як називається лікар для тварин?"},
  {word: "гепард", question: "Як називається найшвидша наземна тварина?"},
  {word: "папуга", question: "Як називається птах, що вміє повторювати слова?"},
  {word: "кит", question: "Як називається найбільша тварина у світі?"},
  {word: "їжак", question: "Як називається тварина з голками на спині?"},
  {word: "восьминіг", question: "Як називається морська тварина з вісьмома щупальцями?"},
  {word: "метро", question: "Як називається транспорт, що рухається під землею?"},
  {word: "день", question: "Як називається частина доби між ранком і вечором?"}
];

let word, answerWord, livesLeft;
let score = 0;
let time;
let timerInterval;

function startGame() {
  clearInterval(timerInterval);

  let randomIndex = Math.floor(Math.random() * wordsArray.length);
  word = wordsArray[randomIndex].word;

  answerWord = [];
  livesLeft = [];

  for (let i = 0; i < word.length; i++) {
    answerWord[i] = "_";
    livesLeft[i] = "❤️";
  }

  result.innerHTML = answerWord.join(" ");
  lives.innerHTML = livesLeft.join(" ");
  questionSection.innerText = wordsArray[randomIndex].question;

  time = 60;
  timerElement.innerText = "Час: " + time;

  mainSound.volume = 0.3;
  mainSound.loop = true;
  mainSound.play();

  timerInterval = setInterval(() => {
    time--;
    timerElement.innerText = "Час: " + time;

    if (time === 0) {
      endGame(false);
    }
  }, 2000);
}

function endGame(win) {
  clearInterval(timerInterval);
  mainSound.pause();

  if (win) {
    score += 10;
    winSound.play();
    congratulation.play();

    setTimeout(() => {
      alert("🎉 Перемога! Очки: " + score);
      startGame();
    }, 800);

  } else {
    loseSound.play();

    setTimeout(() => {
      alert("😢 Програш!");
      startGame();
    }, 800);
  }
}

startButton.addEventListener("click", startGame);

button.addEventListener("click", function () {
  buttonSound.play();

  let letter = textInput.value.toLowerCase();
  textInput.value = "";

  if (letter.length !== 1) {
    alert("Введи одну букву!");
    return;
  }

  let found = false;

  for (let i = 0; i < word.length; i++) {
    if (letter === word[i] && answerWord[i] === "_") {
      answerWord[i] = letter;
      found = true;
    }
  }

  if (!found) {
    wrongLetter.play();
    alert("Такої букви тут немає 😕")
    livesLeft.pop();
    lives.innerHTML = livesLeft.join(" ");
  }

  result.innerHTML = answerWord.join(" ");

  if (livesLeft.length === 0) {
    endGame(false);
  }

  if (!answerWord.includes("_")) {
    endGame(true);
  }
});


