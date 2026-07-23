import './styles/main.scss';

const startScreen = document.getElementById('screen-start');
const quizScreen = document.getElementById('screen-quiz');
const resultScreen = document.getElementById('screen-result');

const startButton = document.getElementById('start-button');
const restartButton = document.getElementById('restart-button');

const quizQuestionText = document.getElementById('quiz-question');
const totalQuestionSpan = document.getElementById('total-questions');
const answersContainer = document.getElementById('answers-container');
const currentQuestionSpan = document.getElementById('current-question-index');
const scoreSpan = document.getElementById('score');
const progressBar = document.getElementById('progress');

const resultMessage = document.getElementById('result-message');
const finalScoreSpan = document.getElementById('final-score');
const resultScore = document.getElementById('result-score');

const quizQuestions = [
  {
    question: "What is the capital of France?",
    answers: [
      { text: "London", correct: false },
      { text: "Berlin", correct: false },
      { text: "Paris", correct: true },
      { text: "Madrid", correct: false },
    ],
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: [
      { text: "Venus", correct: false },
      { text: "Mars", correct: true },
      { text: "Jupiter", correct: false },
      { text: "Saturn", correct: false },
    ],
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      { text: "Atlantic Ocean", correct: false },
      { text: "Indian Ocean", correct: false },
      { text: "Arctic Ocean", correct: false },
      { text: "Pacific Ocean", correct: true },
    ],
  },
  {
    question: "Which of these is NOT a programming language?",
    answers: [
      { text: "Java", correct: false },
      { text: "Python", correct: false },
      { text: "Banana", correct: true },
      { text: "JavaScript", correct: false },
    ],
  },
  {
    question: "What is the chemical symbol for gold?",
    answers: [
      { text: "Go", correct: false },
      { text: "Gd", correct: false },
      { text: "Au", correct: true },
      { text: "Ag", correct: false },
    ],
  },
];


let answerDisabled = false;
let currentQuestionIndex = 0;
let score = 0;

currentQuestionSpan.textContent = currentQuestionIndex;
totalQuestionSpan.textContent = quizQuestions.length;
scoreSpan.textContent = score;

startButton.addEventListener("click", startQuiz);
restartButton.addEventListener("click", restartQuiz);

function startQuiz() {
  score = 0;
  currentQuestionIndex = 0;

  scoreSpan.textContent = score;


  startScreen.classList.remove('active');
  quizScreen.classList.add('active');

  displayQuestions();
}

function displayQuestions() {
  answersContainer.innerHTML = '';
  answerDisabled = false;

  const currentQuizQuestion = quizQuestions[currentQuestionIndex];
  currentQuestionSpan.textContent = currentQuestionIndex + 1;

  const progressPrecent = (currentQuestionIndex / quizQuestions.length) * 100;
  progressBar.style.width = progressPrecent + "%";

  const fragment = document.createDocumentFragment();
  quizQuestionText.textContent = currentQuizQuestion.question;
  currentQuizQuestion.answers.forEach(answer => {
    const button = document.createElement('button');

    button.textContent = answer.text;
    button.classList.add('answer-btn');
    button.dataset.correct = answer.correct;
    button.addEventListener('click', selectAnswer);

    fragment.appendChild(button);
  })

  answersContainer.appendChild(fragment);
}

function selectAnswer(event) {
  if (answerDisabled) return;

  answerDisabled = true;

  const selectedButton = event.target;
  const isCorrect = selectedButton.dataset.correct === "true";

  const allButtons = document.querySelectorAll(".answer-btn");

  allButtons.forEach(btn => {
    if (btn.dataset.correct === 'true') {
      btn.classList.add("correct");
    } else if (btn === selectedButton) {
      btn.classList.add('incorrect');
    }
  });

  if (isCorrect) {
    score++;
    scoreSpan.textContent = score;
  }

  setTimeout(() => {
    currentQuestionIndex++;
    if (currentQuestionIndex < quizQuestions.length) {
      displayQuestions();
    } else {
      progressBar.style.width = (currentQuestionIndex / quizQuestions.length) * 100;
      showResult();
    }
  }, 1000)
}

function showResult() {
  quizScreen.classList.remove('active');
  resultScreen.classList.add('active');

  finalScoreSpan.textContent = score;
  resultScore.textContent = quizQuestions.length;
  const percentageOfFinal = (score / quizQuestions.length) * 100;

  if (percentageOfFinal === 100) {
    resultMessage.textContent = "Perfect! You're a genius!";

  } else if (percentageOfFinal >= 80) {
    resultMessage.textContent = "Great job! Keep learning!";
  } else if (percentageOfFinal >= 60) {
    resultMessage.textContent = "Good effort! Keep learning!";
  } else if (percentageOfFinal >= 40) {
    resultMessage.textContent = "Not bad! Try again to improve!";
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!";
  }
}


function restartQuiz() {
  resultScreen.classList.remove('active');
  startScreen.classList.add('active');
}