import Popup from "./Popup";

class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }

  open({ name, link }) {
    super.open();
    this._popupElement.querySelector(".modal__picture").src = link;
    this._popupElement.querySelector("img").alt = name;
    this._popupElement.querySelector("h4").innerHTML = name;
  }
}

export { PopupWithImage };
