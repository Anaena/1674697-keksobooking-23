import { showAlert } from './utils.js';
import { renderCards } from './card-popup.js';
import { getData } from './api.js';

const dataPromise = getData(() => showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.'));

dataPromise
  .then((data) => {
    renderCards(data);
  });
