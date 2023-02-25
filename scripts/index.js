const editButton = document.querySelector('.profile__edit-button');
const profileName = document.querySelector('.profile__name');
const profileAbout = document.querySelector('.profile__about');
const sectionCards = document.querySelector('.cards');
const initialCards = [
  {
    name: 'Балтийская коса',
    link: './images/cards/baltiyskay-kosa.jpg',
  },
  {
    name: 'Куршская коса',
    link: './images/cards/kurshskay-kosa.jpg',
  },
  {
    name: 'Петропавловск-Камчатский',
    link: './images/cards/petropavlovsk-kamchatsky.jpg',
  },
  {
    name: 'Халактырский пляж',
    link: './images/cards/halaktyrsky.jpg',
  },
  {
    name: 'Териберка',
    link: './images/cards/teriberka.jpg',
  },
  {
    name: 'Рыбачий',
    link: './images/cards/rybachy.jpg',
  },
];
const cardTemplate = document.querySelector('.card-template').content;
const popup = document.querySelector('.popup');
const editForm = popup.querySelector('.popup__form');
const closeButton = popup.querySelector('.popup__close-button');
const inputName = popup.querySelector('.popup__field_type_name');
const inputAbout = popup.querySelector('.popup__field_type_about');

initialCards.forEach(element => {
  const cardElement = cardTemplate.cloneNode(true);
  cardElement.querySelector('.card__title').textContent = element.name;
  cardElement.querySelector('.card__image').src = element.link;
  cardElement.querySelector('.card__image').alt = element.name;
  sectionCards.append(cardElement);
});

function openPopup() {
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  popup.classList.add('popup_opened');
}

function closePopup() {
  popup.classList.remove('popup_opened');
}

function editFormSubmit(evt) {
  evt.preventDefault();
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  closePopup();
}

editButton.addEventListener('click', openPopup);
closeButton.addEventListener('click', closePopup);
editForm.addEventListener('submit', editFormSubmit);
