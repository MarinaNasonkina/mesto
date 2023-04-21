import Section from '../components/Section.js';
import Card from '../components/Card.js';
import { initialCards, cardListSelector } from '../utils/constants.js';
import { config, FormValidator } from '../components/FormValidator.js';

const buttonEditProfile = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const buttonAddPlace = document.querySelector('.profile__add-button');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const buttonCloseEditProfile = popupEditProfile.querySelector('.popup__close-button');
const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
const inputName = document.querySelector('.popup__field_type_name');
const inputAbout = document.querySelector('.popup__field_type_about');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const buttonCloseAddPlace = popupAddPlace.querySelector('.popup__close-button');
const formAddPlace = document.querySelector('.popup__form_type_add-place');
const inputPlaceName = document.querySelector('.popup__field_type_place-name');
const inputPlaceImg = document.querySelector('.popup__field_type_place-img');

const popupFullScreen = document.querySelector('.popup_type_full-screen-place');
const buttonCloseFullScreen = popupFullScreen.querySelector('.popup__close-button');
const popupImage = document.querySelector('.popup__image');
const popupSubtitle = document.querySelector('.popup__subtitle');

const validatorEditProfile = new FormValidator(config, formEditProfile);
const validatorAddPlace = new FormValidator(config, formAddPlace);

validatorEditProfile.enableValidation();
validatorAddPlace.enableValidation();

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

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
  popupType.addEventListener('mousedown', closeByOverlay);
  document.addEventListener('keydown', closeByEsc);
}

function closePopup(popupType) {
  popupType.classList.remove('popup_opened');
  popupType.removeEventListener('mousedown', closeByOverlay);
  document.removeEventListener('keydown', closeByEsc);
}

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  validatorEditProfile.resetForm();
  openPopup(popupEditProfile);
}

function submitEditForm(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(popupEditProfile);
}

function openAddPlacePopup() {
  formAddPlace.reset();
  validatorAddPlace.resetForm();
  openPopup(popupAddPlace);
}

function submitAddPlaceForm(evt) {
  evt.preventDefault();
  renderCard({
    name: inputPlaceName.value,
    link: inputPlaceImg.value,
  });
  closePopup(popupAddPlace);
}

function openFullScreenPopup(evt) {
  popupImage.src = evt.target.src;
  popupImage.alt = evt.target.alt;
  popupSubtitle.textContent = evt.target.alt;
  openPopup(popupFullScreen);
}

function closeByOverlay(evt) {
  if (evt.target.classList.contains('popup')) {
    closePopup(evt.currentTarget);
  }
}

function closeByEsc(evt) {
  if (evt.key === 'Escape') {
    const openedPopup = document.querySelector('.popup_opened');
    closePopup(openedPopup);
  }
}

buttonEditProfile.addEventListener('click', openEditProfilePopup);
buttonAddPlace.addEventListener('click', openAddPlacePopup);

buttonCloseEditProfile.addEventListener('click', () => closePopup(popupEditProfile));
buttonCloseAddPlace.addEventListener('click', () => closePopup(popupAddPlace));
buttonCloseFullScreen.addEventListener('click', () => closePopup(popupFullScreen));

formEditProfile.addEventListener('submit', submitEditForm);
formAddPlace.addEventListener('submit', submitAddPlaceForm);
