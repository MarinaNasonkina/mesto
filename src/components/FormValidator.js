export default class FormValidator {
  constructor(config, form) {
    this._selectorInput = config.selectorInput;
    this._selectorSubmitButton = config.selectorSubmitButton;
    this._classInputError = config.classInputError;

    this._form = form;
    this._fieldsList = Array.from(
      this._form.querySelectorAll(this._selectorInput)
    );
    this._buttonSubmit = this._form.querySelector(this._selectorSubmitButton);
  }

  _showFieldError(field) {
    const formError = this._form.querySelector(`.${field.id}-error`);
    field.classList.add(this._classInputError);
    formError.textContent = field.validationMessage;
  }

  _hideFieldError(field) {
    const formError = this._form.querySelector(`.${field.id}-error`);
    field.classList.remove(this._classInputError);
    formError.textContent = '';
  }

  _checkFieldValidity(field) {
    field.validity.valid
      ? this._hideFieldError(field)
      : this._showFieldError(field);
  }

  _hasInvalidField() {
    return this._fieldsList.some(field => !field.validity.valid);
  }

  _toggleButtonState() {
    this._hasInvalidField()
      ? this._buttonSubmit.setAttribute('disabled', '')
      : this._buttonSubmit.removeAttribute('disabled');
  }

  _setEventListeners() {
    this._fieldsList.forEach(field => {
      field.addEventListener('input', () => {
        this._checkFieldValidity(field);
        this._toggleButtonState();
      });
    });
  }

  resetForm() {
    this._fieldsList.forEach(this._hideFieldError.bind(this));
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}
