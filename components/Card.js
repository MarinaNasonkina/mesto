import {
  selectorCard,
  selectorCardImage,
  selectorCardTitle,
  selectorCardLike,
  classLikeActive,
  selectorCardRemove,
} from "../utils/constants.js";

export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(selectorCard)
      .cloneNode(true);

    return card;
  }

  _likeCard(evt) {
    evt.target.classList.toggle(classLikeActive);
  }

  _removeCard(evt) {
    evt.target.closest(selectorCard).remove();
  }

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', this._likeCard);
    this._buttonRemoveCard.addEventListener('click', this._removeCard);
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector(selectorCardImage);
    this._cardTitle = this._card.querySelector(selectorCardTitle);
    this._buttonLikeCard = this._card.querySelector(selectorCardLike);
    this._buttonRemoveCard = this._card.querySelector(selectorCardRemove);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
