
import './card-popup.js';
import './form.js';
import { initMap, addAdvertMarkers } from './map.js';
import { deactivatePage } from './page-modes.js';
import { getData } from './api.js';

deactivatePage();

initMap(() => {
  getData(addAdvertMarkers);
});
