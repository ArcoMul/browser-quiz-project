import { getTimerFromStorage } from './storage.js';

import { initResultPage } from '../pages/resultPage.js';
import { PROGRESS_TIME_ITEM } from '../constants.js';
export const createTimePressure = () => {
  const timeCounter = () => {
    let target = getTimerFromStorage();
    let minute = Math.floor(target / 60);
    let second = Math.floor(target % 60);

    if (second < 10) {
      document.querySelector(
        `.${PROGRESS_TIME_ITEM}`
      ).innerHTML = String.raw`0${minute}:0${second}`;
    } else {
      document.querySelector(
        `.${PROGRESS_TIME_ITEM}`
      ).innerHTML = String.raw`0${minute}:${second}`;
    }
    if (target < 0) {
      clearInterval(timer);
      initResultPage();
    }
  };
  const timer = setInterval(timeCounter, 1000);
};
