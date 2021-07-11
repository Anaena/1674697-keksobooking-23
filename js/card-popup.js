const cardTemplate = document.querySelector('#card').content.querySelector('.popup');

const setCardElement = (cardElement, className, value) => {
  const element = cardElement.querySelector(className);
  if (!value) {
    element.classList.add('hidden');
  } element.textContent = value;
};

const getCardType = (type) => {
  switch (type) {
    case 'flat':
      return 'Квартира';
    case 'bungalow':
      return 'Бунгало';
    case 'house':
      return 'Дом';
    case 'palace':
      return 'Дворец';
    case 'hotel':
      return 'Отель';
  }
};

const getFeatures = (cardElement, features) => {
  const featuresBlock = cardElement.querySelector('.popup__features');
  const popupFeatures = featuresBlock.children;
  if (!features) {
    return featuresBlock.classList.add('hidden');
  }
  for (const popupFeature of popupFeatures) {
    popupFeature.classList.add('hidden');
    for (const feature of features) {
      if (popupFeature.classList.contains(`popup__feature--${feature}`)) {
        popupFeature.classList.remove('hidden');
      }
    }
  }
};

const getImages = (cardElement, photos) => {
  const photosBlock = cardElement.querySelector('.popup__photos');
  const popupPhoto = photosBlock.querySelector('.popup__photo');
  if (!photos) {
    return photosBlock.classList.add('hidden');
  }
  popupPhoto.src = photos[0];
  for (let i = 1; i < photos.length; i++) {
    const newPhoto = popupPhoto.cloneNode(false);
    newPhoto.src = photos[i];
    photosBlock.appendChild(newPhoto);
  }
};

const renderCards = (advert) => {
  const cardElement = cardTemplate.cloneNode(true);
  const offer = advert.offer;
  setCardElement(cardElement, '.popup__title', offer.title);
  setCardElement(cardElement, '.popup__text--address', offer.address);
  setCardElement(cardElement, '.popup__text--price', `${offer.price} ₽/ночь`);
  setCardElement(cardElement, '.popup__type', getCardType(offer.type));
  setCardElement(cardElement, '.popup__text--capacity', `${offer.rooms} комнаты для ${offer.guests} гостей`);
  setCardElement(cardElement, '.popup__text--time', `Заезд после ${offer.checkin}, выезд до ${offer.checkout}`);
  getFeatures(cardElement, offer.features);
  setCardElement(cardElement, '.popup__description', offer.description);
  getImages(cardElement, offer.photos);
  cardElement.querySelector('.popup__avatar').src = advert.author.avatar;
  return cardElement;
};

export { renderCards };
