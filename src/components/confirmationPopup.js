import Popup from "./Popup";

class confirmationPopup extends Popup {
  constructor(popupSelector,  ) {
    super({ popupSelector });
  }
  close(){

    super.close();

  }
  open() {
    super.open();
  }
  setSubmitAction(submitHandler){
    this.submitHandler = submitHandler;

  }
  setEventListeners() {
    super.setEventListeners()
    const saveButton = this._popupElement.querySelector(".modal__save-button");
    saveButton.classList.add("transparent");
    console.log(saveButton);
    saveButton.addEventListener("click", () => {this.submitHandler()});
  }
}

export { confirmationPopup };
