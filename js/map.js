import { activatePage } from './page-modes.js';
import { address } from './form.js';
import { renderCards } from './card-popup.js';

const TOKIO_LAT = 35.6817;
const TOKIO_LNG = 139.75388;
const ADVERTS_NUMBER = 10;

const map = L.map('map-canvas');

const mainPinIcon = L.icon({
  iconUrl: '../img/main-pin.svg',
  iconSize: [52, 52],
  iconAnchor: [26, 52],
});

const mainMarker = L.marker(
  {
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  },
  {
    draggable: true,
    icon: mainPinIcon,
  },
);

const addMainMarker = () => {
  mainMarker.addTo(map);

  mainMarker.on('moveend', (evt) => {
    const currentCoordinates = evt.target.getLatLng();
    const currentLat = currentCoordinates.lat.toFixed(5);
    const currentLng = currentCoordinates.lng.toFixed(5);
    address.value = `${currentLat}, ${currentLng}`;
  });
};

const pinIcon = L.icon({
  iconUrl: './img/pin.svg',
  iconSize: [40, 40],
  iconAnchor: [20, 40],
});

let advertGroup;

const addAdvertMarkers = (adverts) => {
  advertGroup = L.layerGroup().addTo(map);
  adverts.forEach((element, index) => {
    L.marker(
      {
        lat: element.location.lat,
        lng: element.location.lng,
      },
      {
        icon: pinIcon,
      },
    ).addTo(advertGroup)
      .bindPopup(
        renderCards(adverts[index]),
        {
          keepInView: true,
        },
      );
  });
};

const startAddressValue = () => {
  address.value = `${TOKIO_LAT}, ${TOKIO_LNG}`;
};

const initMap = () => {
  map.on('load', () => {
    activatePage();
    addMainMarker();
  });

  map.setView({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  }, 13);

  L.tileLayer(
    'https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png',
    {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    },
  ).addTo(map);
};

let allAdverts;

const saveData = (loadedData) => {
  allAdverts = loadedData;
};

const resetMap = () => {
  mainMarker.setLatLng({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  });

  map.setView({
    lat: TOKIO_LAT,
    lng: TOKIO_LNG,
  }, 13);

  startAddressValue();
  advertGroup.remove();
  addAdvertMarkers(allAdverts.slice(0, ADVERTS_NUMBER));
};

export { initMap, resetMap, saveData, addAdvertMarkers, ADVERTS_NUMBER, startAddressValue };
