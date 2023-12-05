class Card {
  constructor(name, link, template, imageClickHandler) {
    this._name = name;
    this._link = link;
    this._template = template;
    this._imageClickHandler = imageClickHandler;
  }

  _addImageFunctionality() {
    const cardElement = this._template;
    const cardImageEl = cardElement.querySelector("#gallery__image");

    cardImageEl.addEventListener("click", () => {
      this._imageClickHandler({
        name: this._name,
        link: this._link,
      });
    });
  }

  _addLikeFunctionality() {
    const likeButton = this._template.querySelector("#gallery__like-button");

    likeButton.addEventListener("click", () => {
      likeButton.classList.toggle("gallery__like-button_liked");
    });
  }

  _addDeleteFunctionality() {
    const deleteButton = this._template.querySelector("#gallery__trash");
    deleteButton.addEventListener("click", () => {
      const cardElement = deleteButton.closest(".gallery__card");
      if (cardElement) {
        cardElement.remove();
      }
    });
  }

  _setEventListeners() {
    this._addImageFunctionality();

    this._addLikeFunctionality();

    this._addDeleteFunctionality();
  }

  addCard() {
    this._template = this._template.cloneNode(true);

    const cardElement = this._template;
    const cardImageEl = cardElement.querySelector("#gallery__image");
    const cardTitleEl = cardElement.querySelector("#gallery__text");

    cardTitleEl.textContent = this._name;
    cardImageEl.src = this._link;
    cardImageEl.alt = this._name;
    this._setEventListeners();

    return this._template;
  }
}

export default Card;
