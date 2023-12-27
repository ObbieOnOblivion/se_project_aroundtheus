import Popup from "./Popup";

class confirmationPopup extends Popup {
  constructor(popupSelector, submitHandler ) {
    super({ popupSelector });
    this.submitHandler = submitHandler;
  }
  open() {
    super.open();
  }
  setEventListeners({id , handler}) {
    super.setEventListeners()
    const saveButton = this._popupElement.querySelector(".modal__save-button");
    saveButton.addEventListener("click", () => {
      if(this.submitHandler(id)){
        handler()
      }
      super.close();
    });
  }
}

export { confirmationPopup };
