import { adForm } from './page-modes.js';

const MIN_TITLE_LENGTH = 30;
const MAX_TITLE_LENGTH = 100;
const MAX_PRICE = 1000000;
const MIN_PRICE = {
  bungalow: 0,
  flat: 1000,
  hotel: 3000,
  house: 5000,
  palace: 10000,
};

const title = adForm.querySelector('#title');
const price = adForm.querySelector('#price');
const type = adForm.querySelector('#type');
const roomNumber = adForm.querySelector('#room_number');
const capasity = adForm.querySelector('#capacity');

const checkTitleValidity = () => {
  const titleLength = title.value.length;

  if (titleLength < MIN_TITLE_LENGTH) {
    title.setCustomValidity(`Ещё ${(MIN_TITLE_LENGTH - titleLength)} символов`);
    title.style.outline = '3px solid #e90000';
  } else if (titleLength > MAX_TITLE_LENGTH) {
    title.setCustomValidity(`Удалите лишние ${titleLength - MAX_TITLE_LENGTH} симв.`);
    title.style.outline = '3px solid #e90000';
  } else {
    title.style.outline = 'none';
    title.setCustomValidity('');
  }

  title.reportValidity();
};

title.addEventListener('input', checkTitleValidity);

const checkPriceValidity = () => {
  if (price.value > MAX_PRICE) {
    price.setCustomValidity(`Цена не должна превышать ${MAX_PRICE} руб.`);
    price.style.outline = '3px solid #e90000';
  } else if (price.value < MIN_PRICE[type.value]) {
    price.setCustomValidity(`Цена должна быть не менее ${MIN_PRICE[type.value]} руб.`);
    price.style.outline = '3px solid #e90000';
  } else {
    price.style.outline = 'none';
    price.setCustomValidity('');
  }

  price.placeholder = MIN_PRICE[type.value];
  price.reportValidity();
};

type.addEventListener('change', checkPriceValidity);
price.addEventListener('input', checkPriceValidity);

const checkRoomValidity = () => {
  const guests = capasity.value;
  const rooms = roomNumber.value;
  if (rooms === '100' && guests !== '0') {
    capasity.setCustomValidity('Только не для гостей');
  } else if (rooms === '3' && guests === '0') {
    capasity.setCustomValidity('Вариант для 3, 2 или 1 гостя');
  } else if (rooms === '1' && guests !== '1') {
    capasity.setCustomValidity('Только для 1 гостя');
  } else if (rooms === '2' && guests === '0' || rooms === '2' && guests === '3') {
    capasity.setCustomValidity('Для 1 или 2 гостей');
  } else {
    capasity.setCustomValidity('');
  }
  capasity.reportValidity();
};

roomNumber.addEventListener('change', checkRoomValidity);
capasity.addEventListener('change', checkRoomValidity);
