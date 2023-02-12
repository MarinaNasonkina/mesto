let editButton = document.querySelector('.profile__edit-button');
let profileName = document.querySelector('.profile__name');
let profileAbout = document.querySelector('.profile__about');
let popup = document.querySelector('.popup');
let editForm = popup.querySelector('.popup__container');
let closeButton = popup.querySelector('.popup__close-button');
let inputName = popup.querySelector('.popup__field_type_name');
let inputAbout = popup.querySelector('.popup__field_type_about');

inputName.setAttribute('value', profileName.textContent);
inputAbout.setAttribute('value', profileAbout.textContent);

editButton.addEventListener('click', function () {
  popup.classList.add('popup_opened');
});

function closePopup(evt) {
  evt.preventDefault();
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
  popup.classList.remove('popup_opened');
}

closeButton.addEventListener('click', closePopup);

function editFormSubmit(evt) {
  evt.preventDefault();
  inputName.setAttribute('value', inputName.value);
  inputAbout.setAttribute('value', inputAbout.value);
  profileName.textContent = inputName.value;
  profileAbout.textContent = inputAbout.value;
  popup.classList.remove('popup_opened');
}

editForm.addEventListener('submit', editFormSubmit);
