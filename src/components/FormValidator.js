class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
  }

  _checkFormValidity(elements) {
    return elements.every((element) => element.validity.valid);
  }

  disableButton() {
    const inactiveButtonClass = this._options.inactiveButtonClass;
    const saveButton = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
    saveButton.classList.add(inactiveButtonClass);
    saveButton.disabled = true;
  }

  activateButton() {
    const inactiveButtonClass = this._options.inactiveButtonClass;
    const saveButton = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
    saveButton.classList.remove(inactiveButtonClass);
    saveButton.disabled = false;
  }

  _toggleButtonState() {
    const isFormValid = this._checkFormValidity(this._inputElements);

    if (!isFormValid) {
      this.disableButton();
    } else {
      this.activateButton();
    }
  }

  _showInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._options;
    const errorMsgElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.add(inputErrorClass);
    errorMsgElement.textContent = inputElement.validationMessage;
    errorMsgElement.classList.add(errorClass);
  }

  _hideInputError(inputElement) {
    const { inputErrorClass, errorClass } = this._options;
    const errorMsgElement = this._formElement.querySelector(
      `#${inputElement.id}-error`
    );
    inputElement.classList.remove(inputErrorClass);
    console.log(inputElement);
    errorMsgElement.textContent = "";
    errorMsgElement.classList.remove(errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    const { inputSelector } = this._options;
    const inputElements = [
      ...this._formElement.querySelectorAll(inputSelector),
    ];
    this._inputElements = inputElements;

    inputElements.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState(inputElements);
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
