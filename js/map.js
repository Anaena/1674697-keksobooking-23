import { activatePage } from './page-modes.js';
import { address } from './form.js';
import { renderCards } from './card-popup.js';

const TOKIO_LAT = 35.6817;
const TOKIO_LNG = 139.75388;

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
};

export { initMap, resetMap, addAdvertMarkers};
