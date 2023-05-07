import Popup from './Popup.js';

export default class PopupWithConfirmation extends Popup {
  constructor(config, popupSelector, { handleSubmitForm }) {
    super(config, popupSelector);
    this._form = this._popup.querySelector(config.selectorForm);
    this._handleSubmitForm = handleSubmitForm;
  }

  open(card, cardId) {
    super.open();
    this._card = card;
    this._cardId = cardId;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._card, this._cardId);
    });
  }
}
