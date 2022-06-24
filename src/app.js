'use strict';

import { quizData } from './data.js';
import { initWelcomePage } from './pages/welcomePage.js';
import { drawText } from './pages/canvasPage.js';

const loadApp = () => {
  quizData.currentQuestionIndex = 0;

  initWelcomePage();
  setInterval(drawText, 50);
};

window.addEventListener('load', loadApp);
