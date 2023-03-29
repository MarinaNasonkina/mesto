const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__field_invalid',
};

class FormValidator {
  constructor(config, formType) {
    this._formSelector = config.formSelector;
    this._inputSelector = config.inputSelector;
    this._submitButtonSelector = config.submitButtonSelector;
    this._inputErrorClass = config.inputErrorClass;

    this._form = formType;
    this._fieldsList = Array.from(
      this._form.querySelectorAll(this._inputSelector)
    );
    this._buttonSubmit = this._form.querySelector(this._submitButtonSelector);
  }

  _showFieldError(field) {
    const formError = this._form.querySelector(`.${field.id}-error`);
    field.classList.add(this._inputErrorClass);
    formError.textContent = field.validationMessage;
  }

  _hideFieldError(field) {
    const formError = this._form.querySelector(`.${field.id}-error`);
    field.classList.remove(this._inputErrorClass);
    formError.textContent = '';
  }

  _checkFieldValidity(field) {
    if (field.validity.valid) {
      this._hideFieldError(field);
    } else {
      this._showFieldError(field);
    }
  }

  _hasInvalidField() {
    return this._fieldsList.some(field => {
      return !field.validity.valid;
    });
  }

  _toggleButtonState() {
    if (this._hasInvalidField()) {
      this._buttonSubmit.setAttribute('disabled', '');
    } else {
      this._buttonSubmit.removeAttribute('disabled');
    }
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
    this._fieldsList.forEach(field => {
      this._hideFieldError(field);
    });
    this._toggleButtonState();
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { config, FormValidator };
