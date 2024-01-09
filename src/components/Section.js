class Section {
  constructor({ items, renderer }, container) {
    this.items = items;
    this._container = container;
    this._renderer = renderer;
  }

  renderItems() {
    this.items.forEach((item) => {
      this._renderer(item);
    });
  }

  addItem(element) {
    this._container.prepend(element);
  }
}

export { Section };
