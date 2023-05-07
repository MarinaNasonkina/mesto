import './index.css';

import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import UserInfo from '../components/UserInfo.js';
import FormValidator from '../components/FormValidator.js';
import Api from '../components/Api.js';
import {
  configValidator,
  configCard,
  configPopup,
  selectorProfileName,
  selectorProfileAbout,
  selectorProfileAvatar,
  selectorCardSection,
  selectorPopupEditAvatar,
  selectorPopupEditProfile,
  selectorPopupAddPlace,
  selectorPopupFullScreen,
  buttonEditAvatar,
  buttonEditProfile,
  buttonAddPlace,
  formEditAvatar,
  formEditProfile,
  inputName,
  inputAbout,
  formAddPlace,
} from '../utils/constants.js';

const userInfo = new UserInfo({
  selectorProfileName,
  selectorProfileAbout,
  selectorProfileAvatar,
});

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createNewCard(item));
    },
  },
  selectorCardSection
);

const createNewCard = (data) => {
  const card = new Card(data, configCard, openFullScreenPopup);
  return card.generateCard();
};

const openFullScreenPopup = (link, name) => {
  popupFullScreen.open(link, name);
};

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '24c557eb-6f2d-4866-81ae-3b508d0fb910',
    'Content-Type': 'application/json'
  }
});

api.getUserInfo()
.then(result => {
  userInfo.setUserInfo(result);
  userInfo.setUserAvatar(result);
});

api.getInitialCards()
.then(result => {
  cardList.renderItems(result);
});

const validatorEditProfile = new FormValidator(configValidator, formEditProfile);
validatorEditProfile.enableValidation();

const validatorAddPlace = new FormValidator(configValidator, formAddPlace);
validatorAddPlace.enableValidation();

const validatorEditAvatar = new FormValidator(configValidator, formEditAvatar);
validatorEditAvatar.enableValidation();

const popupFullScreen = new PopupWithImage(configPopup, selectorPopupFullScreen);
popupFullScreen.setEventListeners();

const popupAddPlace = new PopupWithForm(configPopup, selectorPopupAddPlace, {
  handleSubmitForm: (formData) => {
    cardList.addItem(createNewCard(formData));
  },
});
popupAddPlace.setEventListeners();

const popupEditAvatar = new PopupWithForm(
  configPopup,
  selectorPopupEditAvatar,
  {
    handleSubmitForm: (formData) => {
      api
        .editAvatar(formData)
        .then((result) => {
          userInfo.setUserAvatar(result);
        })
        .finally(() => {
          popupEditAvatar.renderLoading(false);
        });
    },
  }
);
popupEditAvatar.setEventListeners();

const popupEditProfile = new PopupWithForm(
  configPopup,
  selectorPopupEditProfile,
  {
    handleSubmitForm: (formData) => {
      api
        .editUserInfo(formData)
        .then((result) => {
          userInfo.setUserInfo(result);
        })
        .finally(() => {
          popupEditProfile.renderLoading(false);
        });
    },
  }
);
popupEditProfile.setEventListeners();

const openEditProfileAvatar = () => {
  validatorEditAvatar.resetForm();
  popupEditAvatar.open();
};

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

buttonEditAvatar.addEventListener('click', openEditProfileAvatar);
buttonEditProfile.addEventListener('click', openEditProfilePopup);
buttonAddPlace.addEventListener('click', openAddPlacePopup);
