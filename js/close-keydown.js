import { onModalMessageHide} from './modal-messages.js';
import { isEscEvent } from './utils.js';

const onMessageKeydown = (evt) => {
  if (isEscEvent(evt)) {
    evt.preventDefault();
    onModalMessageHide();
  }
};

export { onMessageKeydown };
