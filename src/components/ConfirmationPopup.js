import Popup from "./Popup";

class ConfirmationPopup extends Popup {
  constructor(popupSelector) {
    super({ popupSelector });
  }
  setSubmitAction(submitHandler){
    this.submitHandler = submitHandler;

  }

  setEventListeners() {
    super.setEventListeners()
    this.submitBtn = this._popupElement.querySelector(".modal__save-button");
      this.submitBtn.addEventListener("click", () => {this.submitHandler(), this.submitBtn.textContent = "Deleting..."});
  }
}

export { ConfirmationPopup };
