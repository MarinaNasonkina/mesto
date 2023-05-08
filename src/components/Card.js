export default class Card {
  constructor(data, userId, config, handlers) {
    this._link = data.link;
    this._name = data.name;
    this._likes = data.likes;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._config = config;
    this._handleCardClick = handlers.handleCardClick;
    this._handleRemoveClick = handlers.handleRemoveClick;
    this._handleLikeClick = handlers.handleLikeClick;
  }

  _getTemplate() {
    const card = document
      .querySelector(this._config.selectorCardTemplate)
      .content.querySelector(this._config.selectorCard)
      .cloneNode(true);

    return card;
  }

  _toggleLikeCard() {
    this._buttonLikeCard.classList.toggle(this._config.classLikeActive);
  }

  _setEventListeners() {
    this._cardImage.addEventListener('click', () => {
      this._handleCardClick(this._link, this._name);
    });

    this._buttonRemoveCard.addEventListener('click', () => {
      this._handleRemoveClick(this._card, this._cardId);
    });

    this._buttonLikeCard.addEventListener('click', () => {
      this._handleLikeClick(this._cardIsLiked, this._cardId);
      this._toggleLikeCard();
      this._cardIsLiked = !this._cardIsLiked;
    });
  }

  setCounter(data) {
    this._counter.textContent = data.length;
  }

  generateCard() {
    this._card = this._getTemplate();

    this._cardImage = this._card.querySelector(this._config.selectorCardImage);
    this._cardTitle = this._card.querySelector(this._config.selectorCardTitle);
    this._buttonRemoveCard = this._card.querySelector(
      this._config.selectorCardRemove
    );
    this._buttonLikeCard = this._card.querySelector(
      this._config.selectorCardLike
    );
    this._counter = this._card.querySelector(this._config.selectorCounter);

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    if (this._cardOwnerId != this._userId) {
      this._buttonRemoveCard.setAttribute('disabled', '');
    }

    if (this._likes.some((like) => like._id === this._userId)) {
      this._cardIsLiked = true;
      this._toggleLikeCard();
    } else {
      this._cardIsLiked = false;
    }

    this.setCounter(this._likes);
    this._setEventListeners();

    return this._card;
  }
}
