import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(config, popupSelector, { handleSubmitForm }) {
    super(config, popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(config.selectorForm);
    this._fieldsList = this._form.querySelectorAll(config.selectorInput);
  }

  _getInputValues() {
    const inputValues = {};

    this._fieldsList.forEach(field => {
      inputValues[field.name] = field.value;
    });

    return inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
      this.close();
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
