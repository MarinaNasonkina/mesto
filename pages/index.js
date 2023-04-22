import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import { config, FormValidator } from '../components/FormValidator.js';
import { initialCards, cardListSelector, buttonEditProfile, buttonAddPlace, formEditProfile, formAddPlace } from '../utils/constants.js';

// Старые константы - убрать после UserInfo
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const inputName = document.querySelector('.popup__field_type_name');
const inputAbout = document.querySelector('.popup__field_type_about');

// Валидаторы форм и их включение
const validatorEditProfile = new FormValidator(config, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddPlace = new FormValidator(config, formAddPlace);
validatorAddPlace.enableValidation();


// Попапы и карточки
const popupFullScreen = new PopupWithImage('.popup_type_full-screen-place');
popupFullScreen.setEventListeners();

const popupEditProfile = new PopupWithForm('.popup_type_edit-profile', {
  handleSubmitForm: (formData) => {
    // тут будет UserInfo - прописать
    popupEditProfile.close();
  }
});
popupEditProfile.setEventListeners();

const openFullScreenPopup = (link, name) => {
  popupFullScreen.open(link, name);
}

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, '.card-template', openFullScreenPopup);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    }
  },
  cardListSelector
);

cardList.renderItems();

const createNewCard = (data) => {
  const card = new Card(data, '.card-template', openFullScreenPopup);
  return card.generateCard();
}

const popupAddPlace = new PopupWithForm('.popup_type_add-place', {
  handleSubmitForm: (formData) => {
    cardList.addItem(createNewCard(formData));
    popupAddPlace.close();
  }
});
popupAddPlace.setEventListeners();


// Переделать в UserInfo
function submitEditForm() {
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
}

// Кнопки открытия попапов и их функции
function openEditProfilePopup() {
  // Переделать по UserInfo
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;

  validatorEditProfile.resetForm();
  popupEditProfile.open();
}

const openAddPlacePopup = () => {
  validatorAddPlace.resetForm();
  popupAddPlace.open();
}

buttonEditProfile.addEventListener('click', openEditProfilePopup);
buttonAddPlace.addEventListener('click', openAddPlacePopup);
