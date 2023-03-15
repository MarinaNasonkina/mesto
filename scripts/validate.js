const config = {
  formSelector: '.popup__form',
  inputSelector: '.popup__field',
  submitButtonSelector: '.popup__submit-button',
  inputErrorClass: 'popup__field_invalid',
};

function showFieldError(form, field, { inputErrorClass }, errorMessage) {
  const formError = form.querySelector(`.${field.id}-error`);
  field.classList.add(inputErrorClass);
  formError.textContent = errorMessage;
}

function hideFieldError(form, field, { inputErrorClass }) {
  const formError = form.querySelector(`.${field.id}-error`);
  field.classList.remove(inputErrorClass);
  formError.textContent = '';
}

function checkFieldValidity(form, field, config) {
  if (field.validity.valid) {
    hideFieldError(form, field, config);
  } else {
    showFieldError(form, field, config, field.validationMessage);
  }
}

function hasInvalidField(fieldsList) {
  return fieldsList.some(field => {
    return !field.validity.valid;
  });
}

function toggleButtonState(fieldsList, button) {
  if (hasInvalidField(fieldsList)) {
    button.setAttribute('disabled', '');
  } else {
    button.removeAttribute('disabled');
  }
}

function resetForm(form, config) {
  const fieldsList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  fieldsList.forEach(field => {
    hideFieldError(form, field, config);
  });
  toggleButtonState(fieldsList, button);
}

function setEventListeners(form, config) {
  const fieldsList = Array.from(form.querySelectorAll(config.inputSelector));
  const button = form.querySelector(config.submitButtonSelector);

  fieldsList.forEach(field => {
    field.addEventListener('input', () => {
      checkFieldValidity(form, field, config);
      toggleButtonState(fieldsList, button);
    });
  });
}

function enableValidation(config) {
  const formsList = Array.from(document.querySelectorAll(config.formSelector));

  formsList.forEach(form => {
    setEventListeners(form, config);
  });
}

enableValidation(config);
