import Popup from "./Popup";

class confirmationPopup extends Popup {
  constructor(popupSelector, submitHandler, apiDelete ) {
    super({ popupSelector });
    this.submitHandler = submitHandler;
    this.apiDelete = apiDelete;
  }
  open() {
    super.open();
  }
  setEventListeners() {
    super.setEventListeners()
    const saveButton = this._popupElement.querySelector(".modal__save-button");
    saveButton.addEventListener("click", () => {
      // this.submitHandler();
      // this.apiDelete();
      console.log("ththththth")

      super.close();
    });
  }
}

export { confirmationPopup };
