
import { address } from './form.js';
import { renderCards } from './card-popup.js';

const DEFAULT_POSITION = { lat: 35.6794, lng: 139.72864 };
const ADVERTS_NUMBER = 10;

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

const mainMarker = L.marker(
  {
    lat: DEFAULT_POSITION.lat,
    lng: DEFAULT_POSITION.lng,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const addAddress = (markerName) => {
  const pinPosition = markerName.getLatLng();
  address.value = `${(pinPosition.lat).toFixed(5)}, ${(pinPosition.lng).toFixed(5)}`;
};

const startAddressValue = () => {
  address.value = `${DEFAULT_POSITION.lat}`, `${DEFAULT_POSITION.lng}`;
};

const addMainMarker = () => {
  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    addAddress(evt.target);
  });
};

const advertGroup = L.layerGroup().addTo(map);

const addAdvertMarkers = (adverts) => {
  adverts.forEach((advert) => {
    L.marker(
      {
        lat: advert.location.lat,
        lng: advert.location.lng,
      },
      {
        icon: pinIcon,
      },
    ).addTo(advertGroup)
      .bindPopup(
        renderCards(advert),
        {
          keepInView: true,
        },
      );
  });
};

const initMap = (cb) => {
  map.on('load', () => {
    cb();
  });

  map.setView({
    lat: DEFAULT_POSITION.lat,
    lng: DEFAULT_POSITION.lng,
  }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
  addMainMarker();
};

const showAdvertMarkers = (adverts) => {
  advertGroup.remove();
  adverts.slice(0, ADVERTS_NUMBER).forEach((advert) =>  addAdvertMarkers(advert).addTo(advertGroup));
};

let receiveAdvert;

const onAdvertReceive = (adverts) => {
  receiveAdvert = adverts.slice();
  showAdvertMarkers(receiveAdvert);
};

const resetMap = () => {
  mainMarker.setLatLng({
    lat: DEFAULT_POSITION.lat,
    lng: DEFAULT_POSITION.lng,
  });

  map.setView({
    lat: DEFAULT_POSITION.lat,
    lng: DEFAULT_POSITION.lng,
  }, 13);

  startAddressValue();
  showAdvertMarkers(receiveAdvert);
};

export { initMap, resetMap, showAdvertMarkers, onAdvertReceive, addAdvertMarkers, ADVERTS_NUMBER, startAddressValue };
