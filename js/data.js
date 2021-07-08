import { getRandomPositiveInteger, getRandomPositiveFloat } from './utils.js';

const OBJECTS = 10;
const TITLE = [
  'Огромный дворец',
  'Маленькая квартира',
  'Большой дом',
  'Уютное бунгало',
  'Комфортный номер',
];

const TYPES = ['palace', 'flat', 'house', 'bungalow', 'hotel'];
const TIMES = ['12:00', '13:00', '14:00'];
const FEATURES = ['wifi', 'dishwasher', 'parking', 'washer', 'elevator', 'conditioner'];
const PHOTOS = [
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/duonguyen-8LrGtIxxa4w.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/brandon-hoogenboom-SNxQGWxZQi0.jpg',
  'https://assets.htmlacademy.ru/content/intensive/javascript-1/keksobooking/claire-rendall-b6kAwr1i0Iw.jpg',
];
const ROOMS = {min: 1, max: 10};
const GUESTS = {min: 1, max: 20};
const PRICE = {min: 10000, max: 90000};
const LOCATION = {
  lat: {
    min: 35.65000,
    max: 35.70000,
    point: 5,
  },
  lng: {
    min: 139.70000,
    max: 139.80000,
    point: 5,
  },
};

const getAvatar = (number) => (`img/avatars/user${number}.png`);

const getAvatarNumber = (cnt) => {
  const picturesNumber = [];
  let number = 1;
  let buf;
  while (picturesNumber.length < cnt) {
    buf = (number++).toString();
    if (buf.includes('9')) {
      buf = (number++).toString();
    }
    if (buf.length < 2) {
      buf = `0${buf}`;
    }
    picturesNumber.push(buf);
  }
  return picturesNumber;
};

const getRandomItem = (items) => (items[getRandomPositiveInteger(0, items.length - 1)]);

const getRandomArray = (items) => {
  const result = [];
  while (result.length === 0) {
    for (let iterable = 0; iterable < items.length - 1; iterable++) {
      if (Math.random() <= 0.5) {
        result.push(items[iterable]);
      }
    }
  }
  return result;
};

// const getRandomAvatarNumber = (randomNumber) => {
//   if (randomNumber > NUMBER_WITH_ZERO) {
//     return `img/avatars/user${randomNumber}.png`;
//   } return `img/avatars/user0${randomNumber}.png`;
// };

// const createAuthor = () => ({
//   avatar: getRandomAvatarNumber(getRandomPositiveInteger(1, OBJECTS)),
// });

const item = (number) => {
  const author = {
    avatar: getAvatar(number),
  };

  const location = {
    lat: getRandomPositiveFloat(LOCATION.lat.min, LOCATION.lat.max, LOCATION.lat.point),
    lng: getRandomPositiveFloat(LOCATION.lng.min, LOCATION.lng.max, LOCATION.lng.point),
  };

  const offer = {
    title: TITLE,
    address: `${location.lat}, ${location.lng}`,
    price: getRandomPositiveInteger(PRICE.min, PRICE.max),
    type: getRandomItem(TYPES),
    rooms: getRandomPositiveInteger(ROOMS.min, ROOMS.max),
    guests: getRandomPositiveInteger(GUESTS.min, GUESTS.max),
    checkin: getRandomItem(TIMES),
    checkout: getRandomItem(TIMES),
    features: getRandomArray(FEATURES),
    description: 'Какое-то описание',
    photos: getRandomArray(PHOTOS),
  };

  return { author, offer, location };
};

const card = new Array(...getAvatarNumber(OBJECTS)).map((key) => item(key));

export { card };
