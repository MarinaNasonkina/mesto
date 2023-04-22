import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import {
  initialCards,
  config,
  selectorProfileName,
  selectorProfileAbout,
  selectorCardSection,
  selectorCardTemplate,
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

const validatorEditProfile = new FormValidator(config, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddPlace = new FormValidator(config, formAddPlace);
validatorAddPlace.enableValidation();

const popupFullScreen = new PopupWithImage(selectorPopupFullScreen);
popupFullScreen.setEventListeners();

const openFullScreenPopup = (link, name) => {
  popupFullScreen.open(link, name);
};

const cardList = new Section(
  {
    items: initialCards,
    renderer: (item) => {
      const card = new Card(item, selectorCardTemplate, openFullScreenPopup);
      const cardElement = card.generateCard();
      cardList.addItem(cardElement);
    },
  },
  selectorCardSection
);
cardList.renderItems();

const createNewCard = (data) => {
  const card = new Card(data, selectorCardTemplate, openFullScreenPopup);
  return card.generateCard();
};

const popupAddPlace = new PopupWithForm(selectorPopupAddPlace, {
  handleSubmitForm: (formData) => {
    cardList.addItem(createNewCard(formData));
    popupAddPlace.close();
  },
});
popupAddPlace.setEventListeners();

const userInfo = new UserInfo({
  selectorProfileName,
  selectorProfileAbout,
});

const popupEditProfile = new PopupWithForm(selectorPopupEditProfile, {
  handleSubmitForm: (formData) => {
    userInfo.setUserInfo(formData);
    popupEditProfile.close();
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
