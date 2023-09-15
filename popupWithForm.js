import Popup from "./popup";
class popupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super(popupSelector)
        this._handleFormSubmit = handleFormSubmit;
        this._popupForm = this._popupElement.querySelector("");
    };

    close(){
        this._popupForm.reset(); 
        super.close();
    }

};
