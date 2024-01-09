import Popup from "./Popup";

class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super({ popupSelector });
    this._handleFormSubmit = handleFormSubmit;
    this._form = this._popupElement.querySelector("form");
    this._inputList = [...this._popupElement.querySelectorAll("input")];
    this.submitBtn = this._popupElement.querySelector(".modal__save-button");
    this._submitBtnText = this.submitBtn.textContent;

  }

  setPreviewedValues(values) {
    this._inputList.forEach((input) => {
      input.value = values[input.name];

    });
  }
  _getInputValues() {
    const inputValues = {};

    this._inputList.forEach((input) => { // look at this 
      inputValues[input.name] = input.value;
    });
    return inputValues;
  }

  open(){
    super.open();
    this.submitBtn.textContent = "Save";
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
    });
  }
}

export { PopupWithForm };
