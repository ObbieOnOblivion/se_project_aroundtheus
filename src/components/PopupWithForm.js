import Popup from "./Popup";

class PopupWithForm extends Popup{
    constructor(popupSelector, handleFormSubmit){
        super({popupSelector});
        this._handleFormSubmit = handleFormSubmit;
        this._form = document.querySelector(popupSelector).querySelector("form");
        this._inputList = [...this._popupElement.querySelectorAll('input')];
    };

    setPreviewedValues(name, description){


        this._inputList.forEach(input =>{

            switch (input.name) {
                case "traveler-name":
                    input.value = name;
                break;
                case "traveler-description":
                    input.value = description;
              }
              
        })

    }

    _getInputValues(){

        const inputValues = {};

        this._inputList.forEach(input => {
            inputValues[input.name] = input.value
        })
        
        return inputValues;
    }

    close(){
        super.close();
        this._form.reset(); 
    }

    setEventListeners(){
        super.setEventListeners();
        this._form.addEventListener("submit", this._handleFormSubmit(this._getInputValues())); 

    }

};

export {PopupWithForm};

