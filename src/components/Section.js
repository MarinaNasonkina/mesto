export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._itemsForRendering = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderItems() {
    this._itemsForRendering.forEach(this._renderer);
  }

  addItem(element) {
    this._container.prepend(element);
  }
}
