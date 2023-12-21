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
      console.log(input.value);
    });

    console.log(this._inputList);
    console.log(inputValues);

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
      const inputValues = this._getInputValues()
      this._handleFormSubmit(inputValues);
      this.close();
    });
  }
}

export { PopupWithForm };
