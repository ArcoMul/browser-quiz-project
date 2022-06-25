'use strict';

import { getAnswersFromStorage } from '../lib/storage.js';

export const createResultElement = (results) => {
  const element = document.createElement('div');
  element.classList.add('container');
  element.innerHTML = String.raw`
  <h1>RESULT</h1>
  `;

  results.forEach((result) => {
    const userAnswers = getAnswersFromStorage();
    const questionCard = document.createElement('div');
    questionCard.classList.add('question-result-card');

    questionCard.innerHTML = String.raw`
  <h2>${result.text}</h2>
  <p>Your answer:${
    userAnswers[results.indexOf(result)] !== undefined
      ? result.answers[userAnswers[results.indexOf(result)]]
      : 'You did not answer this question!'
  } </p>
  <p>Correct answer: ${result.correct} = ${result.answers[result.correct]}</p>
   <h3>Read more about</h3>
  `;
    /* on above if user dont answer until time is up, we fixed your answer on resultpage */

    element.appendChild(questionCard);

    result.links.forEach((link) => {
      const newLink = document.createElement('a');
      newLink.innerHTML = String.raw`

${link.text}`;
      newLink.setAttribute('href', link.href);
      questionCard.appendChild(newLink);
    });
  });

  return element;
};
