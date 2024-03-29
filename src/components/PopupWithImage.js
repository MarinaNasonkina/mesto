import Popup from './Popup.js';

export default class PopupWithImage extends Popup {
  constructor(config, popupSelector) {
    super(config, popupSelector);
    this._popupImage = this._popup.querySelector(config.selectorPopupImage);
    this._popupSubtitle = this._popup.querySelector(config.selectorPopupSubtitle);
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupSubtitle.textContent = name;

    super.open();
  }
}
