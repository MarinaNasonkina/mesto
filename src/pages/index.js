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
  selectorPopupConfirmation,
  buttonEditAvatar,
  buttonEditProfile,
  buttonAddPlace,
  formEditAvatar,
  formEditProfile,
  inputName,
  inputAbout,
  formAddPlace,
} from '../utils/constants.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation';

let userId;

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

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '24c557eb-6f2d-4866-81ae-3b508d0fb910',
    'Content-Type': 'application/json'
  }
});

const popupConfirmation = new PopupWithConfirmation(configPopup, selectorPopupConfirmation, {
  handleSubmitForm: (card, cardId) => {
    api.deleteCard(cardId)
      .then(() => {
        card.remove();
        popupConfirmation.close();
      });
  }
});
popupConfirmation.setEventListeners();

const popupFullScreen = new PopupWithImage(configPopup, selectorPopupFullScreen);
popupFullScreen.setEventListeners();

const createNewCard = (data) => {
  const card = new Card(data, userId, configCard, {
    handleCardClick: (link, name) => {
      popupFullScreen.open(link, name);
    },
    handleRemoveClick: (card, cardId) => {
      popupConfirmation.open(card, cardId);
    },
    handleLikeClick: (cardIsLiked, cardId) => {
      if (cardIsLiked) {
        api.deleteLike(cardId)
          .then(result => {
            card.setCounter(result.likes);
          });
      } else {
        api.putLike(cardId)
          .then(result => {
            card.setCounter(result.likes);
          });
      }
    },
  });
  return card.generateCard();
};

api.getUserInfo()
.then(result => {
  userInfo.setUserInfo(result);
  userInfo.setUserAvatar(result);
  userId = result._id;
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

const popupAddPlace = new PopupWithForm(configPopup, selectorPopupAddPlace, {
  handleSubmitForm: (formData) => {
    api
      .addNewCard(formData)
      .then((result) => {
        cardList.addItem(createNewCard(result));
      })
      .finally(() => {
        popupAddPlace.renderLoading(false);
      });
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
