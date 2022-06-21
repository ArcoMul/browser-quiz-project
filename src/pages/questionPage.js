'use strict';

import {
  ANSWERS_LIST_ID,
  NEXT_QUESTION_BUTTON_ID,
  USER_INTERFACE_ID,
  FULL_TIME
} from '../constants.js';
import {
  createQuestionElement,
  createProgressElement,
} from '../views/questionView.js';
import { createAnswerElement } from '../views/answerView.js';
import { quizData } from '../data.js';
import { createFullTime } from '../views/questionView.js';

export const initQuestionPage = () => {
  const userInterface = document.getElementById(USER_INTERFACE_ID);
  userInterface.innerHTML = '';

  const currentQuestion = quizData.questions[quizData.currentQuestionIndex];
  document.title = currentQuestion.text.substring(0, 60) + '...';
  const questionElement = createQuestionElement(currentQuestion.text);
  const userProgress = createProgressElement(
    quizData.questions.length,
    quizData.currentQuestionIndex + 1,
    50
  );

  userInterface.appendChild(userProgress);
  userInterface.appendChild(questionElement);

  const answersListElement = document.getElementById(ANSWERS_LIST_ID);

  for (const [key, answerText] of Object.entries(currentQuestion.answers)) {
    const answerElement = createAnswerElement(key, answerText);
    answersListElement.appendChild(answerElement);
    answerElement.addEventListener('click', function () {
      quizData.currentQuestionAnswer = key;
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
  const correctAnswer = quizData.questions[quizData.currentQuestionIndex].correct;
  const addClass = quizData.currentQuestionAnswer === correctAnswer ? 'correct' : 'wrong';
  const body = document.getElementById(USER_INTERFACE_ID);
  if(quizData.currentQuestionAnswer === correctAnswer ){
    body.classList.add(addClass)
  } else{
    body.classList.add(addClass)
  }
  quizData.currentQuestionIndex = quizData.currentQuestionIndex + 1;
  document.getElementById(NEXT_QUESTION_BUTTON_ID).removeEventListener('click', nextQuestion);

  setTimeout(() => {
    initQuestionPage();
    body.classList.remove(addClass)
  }, 1500);
  
};

// add pressure timer to quiz

export const appendFullTimeCounter=()=>{
  const fullTimeElement=createFullTime();
  document.body.appendChild(fullTimeElement);
let fullTime = 300;
 const setFullTimeCounter=()=>{
  let minutes =Math.floor(fullTime/60);
  let second = fullTime%60 ;
  second=second<10?'0'+second:second ;
  fullTime--;
  if (fullTime<0){
  fullTime++
  }
  fullTimeElement.innerHTML=`<p id="${FULL_TIME}">${minutes}:${second}</p>`;
 if (fullTime<30){
    fullTimeElement.style.color ='red'
  }
}
return setFullTimeCounter
}
