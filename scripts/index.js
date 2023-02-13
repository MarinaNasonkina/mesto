let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let editForm = popup.querySelector('.popup__form');
let closeButton = popup.querySelector('.popup__close-button');
let inputName = popup.querySelector('.popup__field_type_name');
let inputAbout = popup.querySelector('.popup__field_type_about');

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
