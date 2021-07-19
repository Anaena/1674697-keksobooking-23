import { onMessageKeydown } from './close-keydown.js';
import { resetForm } from './form.js';
import { resetMap } from './map.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successTemplate.cloneNode(true);
const errorMessage = errorTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const onSuccessRemove = () => {
  successMessage.remove();
  resetForm();
  resetMap();
  document.removeEventListener('click', onSuccessRemove);
  document.removeEventListener('keydown', onMessageKeydown);
};

const onErrorRemove = () => {
  errorMessage.remove();
  document.removeEventListener('click', onErrorRemove);
  errorButton.removeEventListener('click', onErrorRemove);
  document.removeEventListener('keydown', onMessageKeydown);
};

const showSuccessMessage = () => {
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onSuccessRemove);
  document.body.appendChild(successMessage);
};

const showErrorMessage = () => {
  document.addEventListener('keydown', onMessageKeydown);
  document.addEventListener('click', onErrorRemove);
  errorButton.addEventListener('click', onErrorRemove);
  document.body.appendChild(errorMessage);
};

export { onErrorRemove, onSuccessRemove, showSuccessMessage, showErrorMessage };
