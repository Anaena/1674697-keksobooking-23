import { isEscEvent } from './utils.js';
import { resetForm } from './form.js';
import { resetMap } from './map.js';

const successTemplate = document.querySelector('#success').content.querySelector('.success');
const errorTemplate = document.querySelector('#error').content.querySelector('.error');
const successMessage = successTemplate.cloneNode(true);
const errorMessage = errorTemplate.cloneNode(true);
const errorButton = errorMessage.querySelector('.error__button');

const onSuccessRemove = () => {
  successMessage.remove();
  document.removeEventListener('click', onSuccessRemove);
};

const onErrorRemove = () => {
  errorMessage.remove();
  document.removeEventListener('click', onErrorRemove);
  errorButton.removeEventListener('click', onErrorRemove);

};

const onElementEscRemove = () => {
  if (isEscEvent) {
    onSuccessRemove();
    document.removeEventListener('keydown', onElementEscRemove);
  }
};

const onErrorEscRemove = () => {
  if (isEscEvent) {
    onErrorRemove();
    document.removeEventListener('keydown', onErrorEscRemove);
  }
};

const showSuccessMessage = () => {
  document.addEventListener('keydown', onElementEscRemove);
  document.addEventListener('click', onSuccessRemove);
  resetForm();
  resetMap();
  document.body.appendChild(successMessage);
};

const showErrorMessage = () => {
  document.addEventListener('keydown', onErrorEscRemove);
  document.addEventListener('click', onErrorRemove);
  errorButton.addEventListener('click', onErrorRemove);

  document.body.appendChild(errorMessage);
};

export { showSuccessMessage, showErrorMessage };
