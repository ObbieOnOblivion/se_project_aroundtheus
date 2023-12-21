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
      this.submitHandler();
      console.log(this.apiDelete());
      this.apiDelete();
      super.close();
    });
  }
}

export { confirmationPopup };
