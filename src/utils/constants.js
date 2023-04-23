const imgRybachy = new URL('../images/cards/rybachy.jpg', import.meta.url);
const imgTeriberka = new URL('../images/cards/teriberka.jpg', import.meta.url);
const imgHalaktyrsky = new URL('../images/cards/halaktyrsky.jpg', import.meta.url);
const imgKamchatsky = new URL('../images/cards/petropavlovsk-kamchatsky.jpg', import.meta.url);
const imgKurshskay = new URL('../images/cards/kurshskay-kosa.jpg', import.meta.url);
const imgBaltiyskay = new URL('../images/cards/baltiyskay-kosa.jpg', import.meta.url);

export const initialCards = [
  {
    name: 'Рыбачий',
    link: imgRybachy,
  },
  {
    name: 'Териберка',
    link: imgTeriberka,
  },
  {
    name: 'Халактырский пляж',
    link: imgHalaktyrsky,
  },
  {
    name: 'Петропавловск-Камчатский',
    link: imgKamchatsky,
  },
  {
    name: 'Куршская коса',
    link: imgKurshskay,
  },
  {
    name: 'Балтийская коса',
    link: imgBaltiyskay,
  },
];

export const configValidator = {
  selectorSubmitButton: '.popup__submit-button',
  selectorInput: '.popup__field',
  classInputError: 'popup__field_invalid',
};

export const configCard = {
  selectorCardTemplate: '.card-template',
  selectorCard: '.card',
  selectorCardImage: '.card__image',
  selectorCardTitle: '.card__title',
  selectorCardRemove: '.card__remove-button',
  selectorCardLike: '.card__like-button',
  classLikeActive: 'card__like-button_active',
};

export const configPopup = {
  selectorPopupClose: '.popup__close-button',
  selectorForm: '.popup__form',
  selectorInput: '.popup__field',
  selectorPopupImage: '.popup__image',
  selectorPopupSubtitle: '.popup__subtitle',
};

export const selectorProfileName = '.profile__name';
export const selectorProfileAbout = '.profile__about';

export const selectorCardSection = '.cards';

export const selectorPopupEditProfile = '.popup_type_edit-profile';
export const selectorPopupAddPlace = '.popup_type_add-place';
export const selectorPopupFullScreen = '.popup_type_full-screen-place';

export const buttonEditProfile = document.querySelector('.profile__edit-button');
export const buttonAddPlace = document.querySelector('.profile__add-button');

export const formEditProfile = document.querySelector('.popup__form_type_edit-profile');
export const inputName = document.querySelector('.popup__field_type_name');
export const inputAbout = document.querySelector('.popup__field_type_about');

export const formAddPlace = document.querySelector('.popup__form_type_add-place');
