const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');

const addButton = document.querySelector('.profile__add-button');
const sectionCards = document.querySelector('.cards');
const cardTemplate = document.querySelector('.card-template').content;

const popups = document.querySelectorAll('.popup');

const popupEditProfile = document.querySelector('.popup_type_edit-profile');
const editForm = document.querySelector('.popup__form_type_edit-profile');
const inputName = document.querySelector('.popup__field_type_name');
const inputAbout = document.querySelector('.popup__field_type_about');

const popupAddPlace = document.querySelector('.popup_type_add-place');
const addPlaceForm = document.querySelector('.popup__form_type_add-place');
const inputPlaceName = document.querySelector('.popup__field_type_place-name');
const inputPlaceImg = document.querySelector('.popup__field_type_place-img');

const closeButtons = document.querySelectorAll('.popup__close-button');

const places = [
  {
    name: 'Рыбачий',
    link: './images/cards/rybachy.jpg',
  },
  {
    name: 'Териберка',
    link: './images/cards/teriberka.jpg',
  },
  {
    name: 'Халактырский пляж',
    link: './images/cards/halaktyrsky.jpg',
  },
  {
    name: 'Петропавловск-Камчатский',
    link: './images/cards/petropavlovsk-kamchatsky.jpg',
  },
  {
    name: 'Куршская коса',
    link: './images/cards/kurshskay-kosa.jpg',
  },
  {
    name: 'Балтийская коса',
    link: './images/cards/baltiyskay-kosa.jpg',
  },
];

places.forEach(element => makePlace(element));

function makePlace(place) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardLike = cardElement.querySelector('.card__like');
  cardElement.querySelector('.card__title').textContent = place.name;
  cardElement.querySelector('.card__image').src = place.link;
  cardElement.querySelector('.card__image').alt = place.name;
  cardLike.addEventListener('click', evt => {
    evt.target.classList.toggle('card__like_active');
  });
  sectionCards.prepend(cardElement);
}

function openPopup(popupType) {
  popupType.classList.add('popup_opened');
}

function closePopup(evt) {
  const popup = evt.target.closest('.popup');
  popup.classList.remove('popup_opened');
}

function openEditProfilePopup() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  openPopup(popupEditProfile);
}

function editFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup(evt);
}

function openAddPlacePopup() {
  inputPlaceName.value = '';
  inputPlaceImg.value = '';
  openPopup(popupAddPlace);
}

function addPlaceFormSubmit(evt) {
  evt.preventDefault();
  const newPlace = {
    name: inputPlaceName.value,
    link: inputPlaceImg.value,
  }
  places.push(newPlace);
  makePlace(newPlace);
  closePopup(evt);
}

editButton.addEventListener('click', openEditProfilePopup);
addButton.addEventListener('click', openAddPlacePopup);

closeButtons.forEach(button => {
  button.addEventListener('click', evt => closePopup(evt));
});

editForm.addEventListener('submit', editFormSubmit);
addPlaceForm.addEventListener('submit', addPlaceFormSubmit);
