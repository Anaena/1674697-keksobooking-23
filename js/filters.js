import { mapFilters } from './page-modes.js';

const ANY_VALUE = 'any';
// const LOW_PRICE_VALUE = 'low';
// const MIDDLE_PRICE_VALUE = 'middle';
// const HIGHT_PRICE_VALUE = 'high';
// const LOW_PRICE = 10000;
// const HIGH_PRICE = 50000;

const typeElement = mapFilters.querySelector('#housing-type');
// const priceElement = mapFilters.querySelector('#housing-price');
// const roomsElement = mapFilters.querySelector('#housing-rooms');
// const guestsElement = mapFilters.querySelector('#housing-guests');
const featureElements = mapFilters.querySelectorAll('.map__checkbox');
const features = Array.from(featureElements);

const filterFeatures = () => {
  features.filter((feature) => feature.checked).map((feature) => feature.value);
};

const filterMatches = ({ element }) => {
  const typeMatches =
    typeElement.value === ANY_VALUE || element.type === typeElement.value;

  const offerMatches =
    typeMatches;

  return offerMatches;
};

const setOfferWeight = (offer, checkedElement) => {
  let count = 0;

  if (!offer.offer.features) {
    offer.weight = count;
    return offer;
  }

  for (const offerFeature of offer.offer.features) {
    if (checkedElement.includes(offerFeature)) {
      count = count + 1;
    }
  }

  return { ...offer, weight: count };
};

const sortByWeight = (current, next) => next.weight - current.weight;

const getFilterOffers = (offers) => {
  const filtredOffers = offers.filter(filterMatches);
  const checkedFeatures = filterFeatures();

  if (checkedFeatures.length) {
    return filtredOffers
      .map((offer) => setOfferWeight(offer, checkedFeatures))
      .sort(sortByWeight);
  } else {
    return filtredOffers;
  }
};

export { mapFilters, getFilterOffers };
