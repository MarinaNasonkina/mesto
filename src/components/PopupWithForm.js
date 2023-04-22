import Popup from './Popup.js';
import { config } from '../utils/constants.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(config.formSelector);
  }

  _getInputValues() {
    this._fieldsList = this._form.querySelectorAll(config.inputSelector);
    this._inputValues = {};

    this._fieldsList.forEach(field => {
      this._inputValues[field.name] = field.value;
    });

    return this._inputValues;
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
