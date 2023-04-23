import './index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  configValidator,
  configCard,
  configPopup,
  selectorProfileName,
  selectorProfileAbout,
  selectorCardSection,
  selectorPopupEditProfile,
  selectorPopupAddPlace,
  selectorPopupFullScreen,
  buttonEditProfile,
  buttonAddPlace,
  formEditProfile,
  inputName,
  inputAbout,
  formAddPlace,
} from '../utils/constants.js';

const validatorEditProfile = new FormValidator(configValidator, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddPlace = new FormValidator(configValidator, formAddPlace);
validatorAddPlace.enableValidation();

const popupFullScreen = new PopupWithImage(configPopup, selectorPopupFullScreen);
popupFullScreen.setEventListeners();

const openFullScreenPopup = (link, name) => {
  popupFullScreen.open(link, name);
};

const createNewCard = (data) => {
  const card = new Card(data, configCard, openFullScreenPopup);
  return card.generateCard();
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      cardList.addItem(createNewCard(item));
    },
  },
  selectorCardSection
);
cardList.renderItems();

const popupAddPlace = new PopupWithForm(configPopup, selectorPopupAddPlace, {
  handleSubmitForm: (formData) => {
    cardList.addItem(createNewCard(formData));
  },
});
popupAddPlace.setEventListeners();

const userInfo = new UserInfo({
  selectorProfileName,
  selectorProfileAbout,
});

const popupEditProfile = new PopupWithForm(configPopup, selectorPopupEditProfile, {
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
  },
});
popupEditProfile.setEventListeners();

const openEditProfilePopup = () => {
  const user = userInfo.getUserInfo();

  inputName.value = user.name;
  inputAbout.value = user.about;

  validatorEditProfile.resetForm();
  popupEditProfile.open();
};

const openAddPlacePopup = () => {
  validatorAddPlace.resetForm();
  popupAddPlace.open();
};

buttonEditProfile.addEventListener('click', openEditProfilePopup);
buttonAddPlace.addEventListener('click', openAddPlacePopup);
