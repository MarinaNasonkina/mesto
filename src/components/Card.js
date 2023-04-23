export default class Card {
  constructor(data, config, handleCardClick) {
    this._link = data.link;
    this._name = data.name;
    this._config = config;
    this._templateSelector = this._config.selectorCardTemplate;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._templateSelector)
      .content.querySelector(this._config.selectorCard)
      .cloneNode(true);

    return card;
  }

  _likeCard() {
    this._buttonLikeCard.classList.toggle(this._config.classLikeActive);
  }

  _removeCard() {
    this._card.remove();
  }

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', this._likeCard.bind(this));
    this._buttonRemoveCard.addEventListener('click', this._removeCard.bind(this));
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });
  }

  generateCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector(this._config.selectorCardImage);
    this._cardTitle = this._card.querySelector(this._config.selectorCardTitle);
    this._buttonLikeCard = this._card.querySelector(this._config.selectorCardLike);
    this._buttonRemoveCard = this._card.querySelector(this._config.selectorCardRemove);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
