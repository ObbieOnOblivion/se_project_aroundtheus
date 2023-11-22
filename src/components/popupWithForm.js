import Popup from "./popup";

class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super({popupSelector});
        this._handleFormSubmit = handleFormSubmit;
        this._form = document.querySelector(popupSelector).querySelector("form");

    };

    _getInputValues(){

        const inputList = [...this._popupElement.querySelectorAll('input')]
        const inputValues= {};

        
        for (const input of inputList) {
            inputValues[input.name = input.value];
        }
        
        return inputValues;
    }

    close(){
        super.close();
        this._form.reset(); 
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener("submit", this._handleFormSubmit);
    }

};

export {PopupWithForm};

