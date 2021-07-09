// import { showAlert } from './utils.js';
import './card-popup.js';
import './page-modes.js';
import { renderCards } from './card-popup.js';
import { card } from './data.js';
// import { getData } from './api.js';

// const dataPromise = getData(() => showAlert('Не удалось получить данные с сервера. Попробуйте ещё раз.'));

// dataPromise
//   .then((data) => {
//     renderCards(data);
//   });

renderCards(card);
