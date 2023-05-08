import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(config, popupSelector, { handleSubmitForm }) {
    super(config, popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector(config.selectorForm);
    this._fieldsList = this._form.querySelectorAll(config.selectorInput);
    this._buttonSubmit = this._form.querySelector(config.selectorPopupSubmit);
  }

  _getInputValues() {
    const inputValues = {};

    this._fieldsList.forEach((field) => {
      inputValues[field.name] = field.value;
    });

    return inputValues;
  }

  renderLoading(isLoading) {
    if (isLoading) {
      this._buttonSubmit.textContent = 'Сохранение';
      // класс loading - анимация многоточия
      this._buttonSubmit.classList.add('loading');
    } else {
      this._buttonSubmit.classList.remove('loading');
      this._form.classList.contains('.popup_type_add-place')
        ? (this._buttonSubmit.textContent = 'Создать')
        : (this._buttonSubmit.textContent = 'Сохранить');
      this.close();
    }
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener('submit', (evt) => {
      evt.preventDefault();
      this.renderLoading(true);
      this._handleSubmitForm(this._getInputValues());
    });
  }

  close() {
    super.close();
    this._form.reset();
  }
}
