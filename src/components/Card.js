export default class Card {
  constructor(data, userId, config, { handleCardClick, handleRemoveClick }) {
    this._link = data.link;
    this._name = data.name;
    this._cardId = data._id;
    this._cardOwnerId = data.owner._id;
    this._userId = userId;
    this._config = config;
    this._templateSelector = this._config.selectorCardTemplate;
    this._handleCardClick = handleCardClick;
    this._handleRemoveClick = handleRemoveClick;
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

  _setEventListeners() {
    this._buttonLikeCard.addEventListener('click', this._likeCard.bind(this));
    this._buttonRemoveCard.addEventListener('click', () => {
      this._handleRemoveClick(this._card, this._cardId);
    });
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
    if (this._cardOwnerId != this._userId) {
      this._buttonRemoveCard.setAttribute('disabled', '');
    }

    this._cardImage.src = this._link;
    this._cardImage.alt = this._name;
    this._cardTitle.textContent = this._name;

    this._setEventListeners();

    return this._card;
  }
}
