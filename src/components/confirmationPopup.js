import Popup from "./Popup";

class confirmationPopup extends Popup {
  constructor(popupSelector, submitHandler ) {
    super({ popupSelector });
    this.submitHandler = submitHandler;
  }
  open() {
    super.open();
  }
  setEventListeners() {
    super.setEventListeners()
    const saveButton = this._popupElement.querySelector(".modal__save-button");
    saveButton.addEventListener("click", () => {
      this.submitHandler();
      console.log("ththththth")
      super.close();
    });
  }
}

export { confirmationPopup };
