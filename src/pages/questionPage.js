'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
} from '../constants.js';
import {
  createQuestionElement,
  createProgressElement,
} from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import {
  addAnswerToStorage,
  addNumberOfCorrectsToStorage,
  clearAllDataFromStorage,
  getNumberOfCorrectsFromStorage,
  getTimerFromStorage,
} from '../lib/storage.js';
import { createAlertElement } from '../views/questionView.js';

let currentAnswerElement = [];
const correctSound = new Audio('public/sounds/sound_correct.mp3');
const wrongSound = new Audio('public/sounds/sound_wrong.mp3');
let numberOfCorrects = getNumberOfCorrectsFromStorage();

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  document.title = currentQuestion.text.substring(0, 60) + '...';
  const questionElement = createQuestionElement(currentQuestion.text);

  //this function creating user progress (progressbar, timer, current result and score)
  const userProgress = createProgressElement(
    quizData.questions.length,
    quizData.currentQuestionIndex + 1,
    numberOfCorrects
  );

  userInterface.appendChild(userProgress);
  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
    answerElement.addEventListener('click', function () {
      quizData.currentQuestionAnswer = key;
      currentAnswerElement = answerElement;
      answersListElement
        .querySelectorAll('.selected')
        .forEach((element) => element.classList.remove('selected'));
      answerElement.classList.add('selected');
    });
  }

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .addEventListener('click', nextQuestion);
};

const nextQuestion = () => {
  //User receive a feedback if the answer correct or wrong
  const correctAnswer =
    quizData.questions[quizData.currentQuestionIndex].correct;
  const isCorrect = quizData.currentQuestionAnswer === correctAnswer;
  const addClass = isCorrect ? 'correct' : 'wrong';
  isCorrect ? correctSound.play() : wrongSound.play();
  const body = document.getElementById(USER_INTERFACE_ID);

  //user must answer question. shows alert when its not answerd.
  if (quizData.currentQuestionAnswer === null) {
    const alertElement = createAlertElement();
    body.appendChild(alertElement);
    setTimeout(() => {
      body.removeChild(alertElement);
    }, 1200);
    return;
  }

  if (isCorrect) {
    numberOfCorrects++;
  }

  addNumberOfCorrectsToStorage(numberOfCorrects);
  addAnswerToStorage(
    quizData.currentQuestionAnswer,
    quizData.currentQuestionIndex
  );
  currentAnswerElement.classList.remove('selected');
  currentAnswerElement.classList.add(addClass);

  quizData.currentQuestionAnswer = null;

  // we check here that we are in last question or not
  //then we increase current question index or removing all data from storage
  quizData.currentQuestionIndex < quizData.questions.length - 1
    ? quizData.currentQuestionIndex++
    : clearAllDataFromStorage();

  document
    .getElementById(NEXT_QUESTION_BUTTON_ID)
    .removeEventListener('click', nextQuestion);

  //After clicked on next question button it passes next question
  setTimeout(() => {
    initQuestionPage();
    currentAnswerElement.classList.remove(addClass);
  }, 1500);
};
