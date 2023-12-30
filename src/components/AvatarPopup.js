import Popup from "./Popup";

class avatarPopup extends Popup {
  constructor(popupSelector, submitHandler) {
    super({ popupSelector });
    this.submitHandler = submitHandler;
  }
  open() {
    super.open();
  }
  setEventListeners() {
    super.setEventListeners();
    const saveForm = this._popupElement.querySelector("form");   // question here 
    
    saveForm.addEventListener("submit", (e) => {
      e.preventDefault();
      const link = this._popupElement.querySelector(".modal-avatar__input").value;
      this.submitHandler(link);
      super.close();
    });
  }
}

export { avatarPopup };
