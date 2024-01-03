class FormValidator {
  constructor(options, formElement) {
    this._options = options;
    this._formElement = formElement;
    this._saveButton = this._formElement.querySelector(
      this._options.submitButtonSelector
    );
  }

  _checkFormValidity(elements) {
    return elements.every((element) => element.validity.valid);
  }

  disableButton() {
    const inactiveButtonClass = this._options.inactiveButtonClass;
    this._saveButton.classList.add(inactiveButtonClass);
    this._saveButton.disabled = true;
  }

  activateButton() {
    const inactiveButtonClass = this._options.inactiveButtonClass;
    this._saveButton.classList.remove(inactiveButtonClass);
    this._saveButton.disabled = false;
  }

  _toggleButtonState(inputElement) {
    const isFormValid = this._checkFormValidity(this._inputElements);

    if (!isFormValid) {
      this.disableButton();
    }
     else {
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
    errorMsgElement.textContent = "";
    errorMsgElement.classList.remove(errorClass);
  }

  _checkInputValidity(inputElement) {
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    }
    else if (inputElement.value.length == 0) {
      this.disableButton();
      
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
        if (inputElement.value.length == 0){
          this.disableButton();
        }else{
          this._checkInputValidity(inputElement);
          this._toggleButtonState(inputElement);
        }
        
      });
    });
  }

  enableValidation() {
    this._setEventListeners();
  }
}

export { FormValidator };
