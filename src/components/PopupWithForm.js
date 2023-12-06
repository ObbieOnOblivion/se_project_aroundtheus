import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = document.querySelector(popupSelector).querySelector("form");
    this._inputList = [...this._popupElement.querySelectorAll("input")];
  }

  setPreviewedValues(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name];
    });
  }
  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => {
      inputValues[input.name] = input.value;
    });

    return inputValues;
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventListeners() {
    super.setEventListeners();
    this._form.addEventListener("submit", (e) => {
      e.preventDefault();
      this._handleFormSubmit(this._getInputValues());
    });
  }
}

export { PopupWithForm };
