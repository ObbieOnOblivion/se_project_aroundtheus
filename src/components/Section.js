class Section {
  constructor({ items, renderer }, container) {
    this._items = items;
    this._container = container;
    this._renderer = renderer;
  }

  renderItems() {
    console.log(this._items);
    this._items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
