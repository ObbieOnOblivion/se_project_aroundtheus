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
    const saveButton = document.querySelector(".modal-confirm__save-button");
    saveButton.addEventListener("click", (e) => {
      this.submitHandler();
      this.apiDelete();
      super.close();
    });
  }
}

export { confirmationPopup };
