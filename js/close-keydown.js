import { onSuccessRemove, onErrorRemove } from './modal-messages.js';
import { isEscEvent } from './utils.js';

const onMessageKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();

    onSuccessRemove();
    onErrorRemove();
  }
};

export { onMessageKeydown };
