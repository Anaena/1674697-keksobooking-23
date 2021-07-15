
import './card-popup.js';
import './form.js';
import { initMap, addAdvertMarkers, saveData, ADVERTS_NUMBER } from './map.js';
import { deactivatePage } from './page-modes.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';

deactivatePage();
initMap();

// initMap(() => {
//   getData(addAdvertMarkers);
// });

getData((adverts) => {
  saveData(adverts);
  addAdvertMarkers(adverts.slice(0, ADVERTS_NUMBER));
});

// loadData((adverts) => {
//   saveData(adverts);
//   addBaloonsOnMap(adverts.slice(0, ADVERTS_NUMBER));
// }, setDataErrorStatus);

setUserFormSubmit();
