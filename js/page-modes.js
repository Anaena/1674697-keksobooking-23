const adForm = document.querySelector('.ad-form');
const fieldsetsForm = adForm.querySelectorAll('fieldset');
const mapFilters = document.querySelector('.map__filters');
const fieldsetsFilters = mapFilters.children;

const deactivatePage = () => {
  adForm.classList.add('ad-form--disabled');
  mapFilters.classList.add('map__filters--disabled');
  for (const fieldsetForm of fieldsetsForm) {
    fieldsetForm.setAttribute('disabled', 'disabled');
  }
  for (const fieldsetFilter of fieldsetsFilters) {
    fieldsetFilter.setAttribute('disabled', 'disabled');
  }
};

const activatePage = () => {
  adForm.classList.remove('ad-form--disabled');
  mapFilters.classList.remove('map__filters--disabled');
  for (const fieldsetForm of fieldsetsForm) {
    fieldsetForm.removeAttribute('disabled');
  }
  for (const fieldsetFilter of fieldsetsFilters) {
    fieldsetFilter.removeAttribute('disabled');
  }
};

export { deactivatePage, activatePage, adForm, mapFilters };
