import Popup from "./Popup";

class ConfirmationPopup extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }
  setSubmitAction(submitHandler){
    this.submitHandler = submitHandler;

  }
  setDefaultSaveButton(){
    this._saveButton.textContent = "Yes";
  }
  updateSaveButton(){
    this._saveButton.textContent = "Deleting...";
  }

  setEventListeners() {
    super.setEventListeners()
    this._saveButton = this._popupElement.querySelector(".modal__save-button");
      this._saveButton.addEventListener("click", () => {this.submitHandler(), this._saveButton.textContent = "Saving..."});
  }
}

export { ConfirmationPopup };
