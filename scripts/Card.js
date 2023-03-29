export default class Card {
  constructor(data, templateSelector, openInFull) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openInFull = openInFull;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector('.card')
      .cloneNode(true);

    return card;
  }

  _likeCard(evt) {
    evt.target.classList.toggle('card__like-button_active');
  }

  _removeCard(evt) {
    evt.target.closest('.card').remove();
  }

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', this._likeCard);
    this._buttonRemoveCard.addEventListener('click', this._removeCard);
    this._cardImage.addEventListener('click', this._openInFull);
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
