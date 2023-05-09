import './index.css';

import Api from '../components/Api.js';
import UserInfo from '../components/UserInfo.js';
import Section from '../components/Section.js';
import Card from '../components/Card.js';
import PopupWithImage from '../components/PopupWithImage.js';
import PopupWithForm from '../components/PopupWithForm.js';
import PopupWithConfirmation from '../components/PopupWithConfirmation.js';
import FormValidator from '../components/FormValidator.js';
import {
  configValidator,
  configCard,
  configPopup,
  configUserInfo,
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

let userId;

const userInfo = new UserInfo(configUserInfo);

const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-65',
  headers: {
    authorization: '24c557eb-6f2d-4866-81ae-3b508d0fb910',
    'Content-Type': 'application/json',
  },
});

Promise.all([
  api.getUserInfo(),
  api.getInitialCards()
])
  .then(([info, initialCards]) => {
    userId = info._id;
    userInfo.setUserInfo(info);
    userInfo.setUserAvatar(info);
    cardList.renderItems(initialCards);
  })
  .catch((err) => {
    alert(err);
  });

const cardList = new Section(
  {
    renderer: (item) => {
      cardList.addItem(createNewCard(item));
    },
  },
  selectorCardSection
);

function createNewCard(data) {
  const card = new Card(data, userId, configCard, {
    handleCardClick: (link, name) => {
      popupFullScreen.open(link, name);
    },

    handleRemoveClick: (cardId) => {
      popupConfirmation.open(card, cardId);
    },

    handleLikeClick: (cardIsLiked, cardId) => {
      if (cardIsLiked) {
        api
          .deleteLike(cardId)
          .then((result) => {
            card.setCounter(result.likes);
            card.toggleLikeButton();
          })
          .catch((err) => {
            alert(err);
          });
      } else {
        api
          .putLike(cardId)
          .then((result) => {
            card.setCounter(result.likes);
            card.toggleLikeButton();
          })
          .catch((err) => {
            alert(err);
          });
      }
    },
  });

  return card.generateCard();
}

const popupFullScreen = new PopupWithImage(
  configPopup,
  selectorPopupFullScreen
);

const popupConfirmation = new PopupWithConfirmation(
  configPopup,
  selectorPopupConfirmation,
  {
    handleSubmitForm: (card, cardId) => {
      api
        .deleteCard(cardId)
        .then(() => {
          card.removeCard();
          popupConfirmation.close();
        })
        .catch((err) => {
          alert(err);
        });
    },
  }
);

const popupEditAvatar = new PopupWithForm(
  configPopup,
  selectorPopupEditAvatar,
  {
    handleSubmitForm: (formData) => {
      api
        .editAvatar(formData)
        .then((result) => {
          userInfo.setUserAvatar(result);
          popupEditAvatar.close();
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          popupEditAvatar.renderLoading(false);
        });
    },
  }
);

const popupEditProfile = new PopupWithForm(
  configPopup,
  selectorPopupEditProfile,
  {
    handleSubmitForm: (formData) => {
      api
        .editUserInfo(formData)
        .then((result) => {
          userInfo.setUserInfo(result);
          popupEditProfile.close();
        })
        .catch((err) => {
          alert(err);
        })
        .finally(() => {
          popupEditProfile.renderLoading(false);
        });
    },
  }
);

const popupAddPlace = new PopupWithForm(configPopup, selectorPopupAddPlace, {
  handleSubmitForm: (formData) => {
    api
      .addNewCard(formData)
      .then((result) => {
        cardList.addItem(createNewCard(result));
        popupAddPlace.close();
      })
      .catch((err) => {
        alert(err);
      })
      .finally(() => {
        popupAddPlace.renderLoading(false);
      });
  },
});

const validatorEditProfile = new FormValidator(configValidator, formEditProfile);

const validatorAddPlace = new FormValidator(configValidator, formAddPlace);

const validatorEditAvatar = new FormValidator(configValidator, formEditAvatar);

function openEditProfileAvatar() {
  validatorEditAvatar.resetForm();
  popupEditAvatar.open();
}

function openEditProfilePopup() {
  const user = userInfo.getUserInfo();

  inputName.value = user.name;
  inputAbout.value = user.about;

  validatorEditProfile.resetForm();
  popupEditProfile.open();
}

function openAddPlacePopup() {
  validatorAddPlace.resetForm();
  popupAddPlace.open();
}

popupEditAvatar.setEventListeners();
popupEditProfile.setEventListeners();
popupAddPlace.setEventListeners();
popupFullScreen.setEventListeners();
popupConfirmation.setEventListeners();

validatorAddPlace.enableValidation();
validatorEditProfile.enableValidation();
validatorEditAvatar.enableValidation();

buttonEditAvatar.addEventListener('click', openEditProfileAvatar);
buttonEditProfile.addEventListener('click', openEditProfilePopup);
buttonAddPlace.addEventListener('click', openAddPlacePopup);
