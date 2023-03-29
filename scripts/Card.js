import { openFullScreenPopup } from './index.js';

const initialCards = [
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

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const card = document
    .querySelector(this._templateSelector)
    .content.querySelector('.card')
    .cloneNode(true);

    return card;
  }

  _handleLikeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _handleRemoveCard(evt) {
    evt.target.closest('.card').remove();
  }

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', evt => this._handleLikeCard(evt));
    this._buttonRemoveCard.addEventListener('click', evt => this._handleRemoveCard(evt));
    this._cardImage.addEventListener('click', evt => openFullScreenPopup(evt));
  }

  generateCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector('.card__image');
    this._cardTitle = this._card.querySelector('.card__title');
    this._buttonLikeCard = this._card.querySelector('.card__like-button');
    this._buttonRemoveCard = this._card.querySelector('.card__remove-button');

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}

export { initialCards, Card };
