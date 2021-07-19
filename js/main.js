
import './card-popup.js';
import './form.js';
import './filters.js';
import { initMap, showAdvertMarkers } from './map.js';
import { deactivatePage, activatePage } from './page-modes.js';
import { getData } from './api.js';
import { setUserFormSubmit } from './form.js';

deactivatePage();

initMap(activatePage);
getData(showAdvertMarkers);

setUserFormSubmit();
