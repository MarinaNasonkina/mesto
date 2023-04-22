import Popup from './Popup.js';
import { selectorPopupImage, selectorPopupSubtitle } from '../utils/constants.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._popupImage = this._popup.querySelector(selectorPopupImage);
    this._popupSubtitle = this._popup.querySelector(selectorPopupSubtitle);
  }

  open(link, name) {
    this._popupImage.src = link;
    this._popupImage.alt = name;
    this._popupSubtitle.textContent = name;

    super.open();
  }
}
