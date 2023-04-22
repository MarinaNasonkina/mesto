import Popup from './Popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, { handleSubmitForm }) {
    super(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._form = this._popup.querySelector('.popup__form');
  }

  _getInputValues() {
    this._fieldsList = this._form.querySelectorAll('.popup__field');
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

// Прописать как коллбэки \/
// function submitEditForm(evt) {
//   profileName.textContent = inputName.value;
//   profileAbout.textContent = inputAbout.value;
//   closePopup(popupEditProfile);
// }
// function submitAddPlaceForm(evt) {
//   renderCard({
//     name: inputPlaceName.value,
//     link: inputPlaceImg.value,
//   });
//   closePopup(popupAddPlace);
// }
